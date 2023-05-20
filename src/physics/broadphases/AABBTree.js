import { AABBox } from "../AABB/index.js"
import { Broadphase } from "./broadphase.js"
import { naturalizePair, Utils } from "../../utils/index.js"

function testPointInside(bound, point) {
  if (bound.min.x > point.x || bound.max.x < point.x)
    return false;
  if (bound.min.y > point.y || bound.max.y < point.y)
    return false;
  return true;
}

function detectCollisionbound(a, b) {
  if (a.min.x > b.max.x || a.max.x < b.min.x)
    return false;
  if (a.min.y > b.max.y || a.max.y < b.min.y)
    return false;
  return true;
}

function containsbound(container, target) {
  return container.min.x <= target.min.x &&
    container.min.y <= target.min.y &&
    container.max.x >= target.max.x &&
    container.max.y >= target.max.y;
}

function union(b1, b2) {
  let minX = Math.min(b1.min.x, b2.min.x);
  let minY = Math.min(b1.min.y, b2.min.y);
  let maxX = Math.max(b1.max.x, b2.max.x);
  let maxY = Math.max(b1.max.y, b2.max.y);
  let res = new AABBox(minX, minY, maxX, maxY);
  return res;
}
class Tree extends Broadphase {
  constructor() {
    super()
    this.nodeID = 0;
    this.root = undefined;
    this.boundMargin = 0.05;
  }
  insert(body) {
    // Enlarged bound
    let bound = body.bounds.clone()
    let newNode = {
      id: this.nodeID++,
      bound: bound,
      isLeaf: true,
      body: body
    };
    body.node = newNode;
    if (this.root == undefined) {
      this.root = newNode;
      return newNode;
    }
    // Find the best sibling for the new leaf
    let bestSibling = this.root;
    let bestCost = union(this.root.bound, bound).area;
    let q = [{ p1: this.root, p2: 0.0 }];
    while (q.length != 0) {
      let front = q.shift();
      let current = front.p1;
      let inheritedCost = front.p2;
      let combined = union(current.bound, bound);
      let directCost = combined.area;
      let costForCurrent = directCost + inheritedCost;
      if (costForCurrent < bestCost) {
        bestCost = costForCurrent;
        bestSibling = current;
      }
      inheritedCost += directCost - current.bound.area;
      let lowerBoundCost = bound.area + inheritedCost;
      if (lowerBoundCost < bestCost) {
        if (!current.isLeaf) {
          q.push({ p1: current.child1, p2: inheritedCost });
          q.push({ p1: current.child2, p2: inheritedCost });
        }
      }
    }
    // Create a new parent
    let oldParent = bestSibling.parent;
    let newParent = {
      id: this.nodeID++,
      parent: oldParent,
      bound: union(bound, bestSibling.bound),
      isLeaf: false
    };
    if (oldParent != undefined) {
      if (oldParent.child1 == bestSibling) {
        oldParent.child1 = newParent;
      }
      else {
        oldParent.child2 = newParent;
      }
      newParent.child1 = bestSibling;
      newParent.child2 = newNode;
      bestSibling.parent = newParent;
      newNode.parent = newParent;
    }
    else {
      newParent.child1 = bestSibling;
      newParent.child2 = newNode;
      bestSibling.parent = newParent;
      newNode.parent = newParent;
      this.root = newParent;
    }
    // Walk back up the tree refitting ancestors' bound and applying rotations
    let ancestor = newNode.parent;
    while (ancestor != undefined) {
      let child1 = ancestor.child1;
      let child2 = ancestor.child2;
      ancestor.bound = union(child1.bound, child2.bound);
      this.rotate(ancestor);
      ancestor = ancestor.parent;
    }
    return newNode;
  }
  rotate(node) {
    if (node.parent == undefined)
      return;
    let parent = node.parent;
    let sibling = parent.child1 == node ? parent.child2 : parent.child1;
    let costDiffs = [];
    let nodeArea = node.bound.area;
    costDiffs.push(union(sibling.bound, node.child1.bound).area - nodeArea);
    costDiffs.push(union(sibling.bound, node.child2.bound).area - nodeArea);
    if (!sibling.isLeaf) {
      let siblingArea = sibling.bound.area;
      costDiffs.push(union(node.bound, sibling.child1.bound).area - siblingArea);
      costDiffs.push(union(node.bound, sibling.child2.bound).area - siblingArea);
    }
    let bestDiffIndex = 0;
    for (let i = 1; i < costDiffs.length; i++) {
      if (costDiffs[i] < costDiffs[bestDiffIndex])
        bestDiffIndex = i;
    }
    if (costDiffs[bestDiffIndex] < 0.0) {
      // console.log("Tree rotation: tpye " + bestDiffIndex);
      switch (bestDiffIndex) {
        case 0:
          // this.swap(sibling, node.child2!);
          if (parent.child1 == sibling)
            parent.child1 = node.child2;
          else
            parent.child2 = node.child2;
          node.child2.parent = parent;
          node.child2 = sibling;
          sibling.parent = node;
          node.bound = union(sibling.bound, node.child1.bound);
          break;
        case 1:
          // this.swap(sibling, node.child1!);
          if (parent.child1 == sibling)
            parent.child1 = node.child1;
          else
            parent.child2 = node.child1;
          node.child1.parent = parent;
          node.child1 = sibling;
          sibling.parent = node;
          node.bound = union(sibling.bound, node.child2.bound);
          break;
        case 2:
          // this.swap(node, sibling.child2!);
          if (parent.child1 == node)
            parent.child1 = sibling.child2;
          else
            parent.child2 = sibling.child2;
          sibling.child2.parent = parent;
          sibling.child2 = node;
          node.parent = sibling;
          sibling.bound = union(node.bound, sibling.child2.bound);
          break;
        case 3:
          // this.swap(node, sibling.child1!);
          if (parent.child1 == node)
            parent.child1 = sibling.child1;
          else
            parent.child2 = sibling.child1;
          sibling.child1.parent = parent;
          sibling.child1 = node;
          node.parent = sibling;
          sibling.bound = union(node.bound, sibling.child1.bound);
          break;
      }
    }
  }
  swap(node1, node2) {
    let parent1 = node1.parent;
    let parent2 = node2.parent;
    if (parent1 == parent2) {
      parent1.child1 = node2;
      parent1.child2 = node1;
      return;
    }
    if (parent1.child1 == node1)
      parent1.child1 = node2;
    else
      parent1.child2 = node2;
    node2.parent = parent1;
    if (parent2.child1 == node2)
      parent2.child1 = node1;
    else
      parent2.child2 = node1;
    node1.parent = parent2;
  }
  remove(body) {
    let node = body.node
    let parent = node.parent;
    node.body.node = undefined;
    if (parent != undefined) {
      let sibling = parent.child1 == node ? parent.child2 : parent.child1;
      if (parent.parent != undefined) {
        sibling.parent = parent.parent;
        if (parent.parent.child1 == parent) {
          parent.parent.child1 = sibling;
        }
        else {
          parent.parent.child2 = sibling;
        }
      }
      else {
        this.root = sibling;
        sibling.parent = undefined;
      }
      let ancestor = sibling.parent;
      while (ancestor != undefined) {
        let child1 = ancestor.child1;
        let child2 = ancestor.child2;
        ancestor.bound = union(child1.bound, child2.bound);
        ancestor = ancestor.parent;
      }
    }
    else {
      if (this.root == node) {
        this.root = undefined;
      }
    }
  }
  queryPoint(point) {
    let res = [];
    if (this.root == undefined)
      return res;
    let q = [this.root];
    while (q.length != 0) {
      let current = q.shift();
      if (!testPointInside(current.bound, point))
        continue;
      if (current.isLeaf) {
        res.push(current);
      }
      else {
        q.push(current.child1);
        q.push(current.child2);
      }
    }
    return res;
  }
  queryRegion(region) {
    let res = [];
    if (this.root == undefined)
      return res;
    fix(region);
    let q = [this.root];
    while (q.length != 0) {
      let current = q.shift();
      if (!detectCollisionbound(current.bound, region))
        continue;
      if (current.isLeaf) {
        res.push(current);
      }
      else {
        q.push(current.child1);
        q.push(current.child2);
      }
    }
    return res;
  }
  getCollisionPairs(target) {
    target = target || [];
    if (this.root == undefined)
      return target;

    let checked = new Set();
    if (!this.root.isLeaf) {
      this.checkCollision(this.root.child1, this.root.child2, target, checked);
    }
    return target;
  }
  checkCollision(a, b, pairs, checked) {
    const key = naturalizePair(a.id, b.id);
    if (checked.has(key))
      return;
    checked.add(key);
    if (a.isLeaf && b.isLeaf) {
      if (detectCollisionbound(a.bound, b.bound) && this.canCollide(a.body,b.body)) {
        pairs.push({ a: a.body, b: b.body });
      }
    }
    else if (!a.isLeaf && !b.isLeaf) {
      this.checkCollision(a.child1, a.child2, pairs, checked);
      this.checkCollision(b.child1, b.child2, pairs, checked);
      if (detectCollisionbound(a.bound, b.bound)) {
        this.checkCollision(a.child1, b.child1, pairs, checked);
        this.checkCollision(a.child1, b.child2, pairs, checked);
        this.checkCollision(a.child2, b.child1, pairs, checked);
        this.checkCollision(a.child2, b.child2, pairs, checked);
      }
    }
    else if (a.isLeaf && !b.isLeaf) {
      this.checkCollision(b.child1, b.child2, pairs, checked);
      if (detectCollisionbound(a.bound, b.bound)) {
        this.checkCollision(a, b.child1, pairs, checked);
        this.checkCollision(a, b.child2, pairs, checked);
      }
    }
    else if (!a.isLeaf && b.isLeaf) {
      this.checkCollision(a.child1, a.child2, pairs, checked);
      if (detectCollisionbound(a.bound, b.bound)) {
        this.checkCollision(b, a.child1, pairs, checked);
        this.checkCollision(b, a.child2, pairs, checked);
      }
    }
  }
  // BFS tree traversal
  traverse(callback) {
    let q = [this.root];
    while (q.length != 0) {
      let current = q.shift();
      if (current == undefined)
        break;
      callback(current);
      if (!current.isLeaf) {
        q.push(current.child1);
        q.push(current.child2);
      }
    }
  }
  update(bodies) {
    for (var i = 0; i < bodies.length; i++) {
      this.remove(bodies[i])
      //this.insert(bodies[i])
    }
    for (var i = 0; i < bodies.length; i++) {
      //this.remove(bodies[i])
      this.insert(bodies[i])
    }
  }
  draw(ctx) {
    ctx.strokeStyle = "blue"
    this.traverse(e => {
      ctx.moveTo(e.bound.min.x, e.bound.min.y)
      ctx.lineTo(e.bound.min.x, e.bound.max.y)
      ctx.lineTo(e.bound.max.x, e.bound.max.y)
      ctx.lineTo(e.bound.max.x, e.bound.min.y)
      ctx.lineTo(e.bound.min.x, e.bound.min.y)
      ctx.stroke()
    })
    ctx.strokeStyle = "black"
  }
  get cost() {
    let cost = 0;
    this.traverse(node => {
      cost += node.bound.area;
    });
    return cost;
  }
}

export {
  Tree as AABBBroadphase
}