//import { Broadphase } from "./broadphase.js"
//import {} from ""
class Client {
  constructor(obj) {
    this.object = obj
  }
}
class Grid {
  constructor(bounds) {
    const x = bounds.max.x - bounds.min.x,
      y = bounds.max.y - bounds.min.y
    this.cells = [...Array(x)].map(_ => [...Array(y)].map(_ => (null)));
    this._bounds = bounds;
    this.queryIds = 0;
  }

  _GetCellIndex(position) {
    const w = this._bounds.max.x - this._bounds.min.x
    const h = this._bounds.max.x - this._bounds.min.x
    const x = (position.x - this._bounds.min.x) / w
    const y = (position.y - this._bounds.min.x) / h
    const xIndex = Math.floor(x * (w - 1))
    const yIndex = Math.floor(y * (h - 1))

    return [xIndex, yIndex];
  }

  createClient(position, bounds) {
    const client = {
      position: position,
      bounds: bounds,
      cells: {
        min: null,
        max: null,
        nodes: null,
      },
      _queryId: -1
    };

    this._Insert(client);

    return client;
  }

  updateClient(client) {

    const i1 = this._GetCellIndex({
      x: client.bounds.min.x,
      y: client.bounds.min.y
    });
    const i2 = this._GetCellIndex({
      x: client.bounds.max.x,
      y: client.bounds.max.y
    });

    if (
      client.cells.min.x == i1[0] &&
      client.cells.min.y == i1[1] &&
      client.cells.max.x == i2[0] &&
      client.cells.max.y == i2[1])
      return


    this.Remove(client);
    this._Insert(client);
  }

  query(bounds) {

    const i1 = this._GetCellIndex({
      x: bounds.min.x,
      y: bounds.min.y
    })
    const i2 = this._GetCellIndex({
      x: bounds.max.x,
      y: bounds.max.y
    })

    const clients = []
    const queryId = this.queryIds++

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        let head = this.cells[x][y];

        while (head) {
          const v = head.client;
          head = head.next;

          if (v._queryId != queryId) {
            v._queryId = queryId;
            clients.push(v);
          }
        }
      }
    }
    return clients;
  }

  _Insert(client) {
    const i1 = this._GetCellIndex({
      x: client.bounds.min.x,
      y: client.bounds.min.y
    });
    const i2 = this._GetCellIndex({
      x: client.bounds.max.x,
      y: client.bounds.max.y
    });
    const nodes = [];

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      nodes.push([]);

      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const xi = x - i1[0];

        const head = {
          next: null,
          prev: null,
          client: client,
        };

        nodes[xi].push(head);

        head.next = this.cells[x][y];
        if (this.cells[x][y]) {
          this.cells[x][y].prev = head;
        }

        this.cells[x][y] = head;
      }
    }

    client.cells.min = i1;
    client.cells.max = i2;
    client.cells.nodes = nodes;
  }

  Remove(client) {
    const i1 = client.cells.min;
    const i2 = client.cells.max;

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const xi = x - i1[0];
        const yi = y - i1[1];
        const node = client.cells.nodes[xi][yi];

        if (node.next) {
          node.next.prev = node.prev;
        }
        if (node.prev) {
          node.prev.next = node.next;
        }

        if (!node.prev) {
          this.cells[x][y] = node.next;
        }
      }
    }

    client.cells.min = null;
    client.cells.max = null;
    client.cells.nodes = null;
  }
}

export{
  Grid// as GridBroadphase
}