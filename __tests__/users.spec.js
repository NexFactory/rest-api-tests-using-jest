const request = require('supertest')

const baseUrl = "http://localhost:3003"

describe("GET /users", () => {
  it("should return 200", async () => {
    const res = await request(baseUrl).get("/users")
    expect(res.statusCode).toBe(200)
  })

  it("should return users array", async () => {
    const response = await request(baseUrl).get("/users")
    expect(response.body.length).toEqual(30)
    expect(response.body[0].username).toEqual('crazypeacock512')
  })
})

describe("GET /users/:id", () => {  
  it("should return 200", async () => {
    const res = await request(baseUrl).get("/users/1")
    expect(res.statusCode).toBe(200)
  })

  it("should return a user object", async () => {
    const res = await request(baseUrl).get("/users/1")
    expect(res.body.username).toEqual('crazypeacock512')
  })
})

describe("POST /users", () => {
  const newItem = {
    id: 101,
    username: 'john101'
  }
  afterAll(async () => {
    await request(baseUrl).delete(`/users/${newItem.id}`)
  })
  
  it("should add new user", async () => {
    const res = await request(baseUrl).post("/users").send(newItem)
    expect(res.statusCode).toBe(201)
    expect(res.body.username).toEqual('john101')
  })
})

describe("PUT /users/:id", () => {
  const newItem = {
    id: 101,
    username: 'john101'
  }
  beforeAll(async () => {
    await request(baseUrl).post("/users").send(newItem)
  })
  afterAll(async () => {
    await request(baseUrl).delete(`/users/${newItem.id}`)
  })

  it("should update item if it exists", async () => {
    const res = await request(baseUrl).put(`/users/${newItem.id}`)
      .send({
        id: 101,
        message: "updated using PUT"
      })
    expect(res.statusCode).toBe(200)
    expect(res.body.id).toEqual(101)
    expect(res.body.username).toEqual(undefined)
    expect(res.body.message).toEqual("updated using PUT")
  })
})

describe("PATCH /users/:id", () => {
  const newItem = {
    id: 101,
    username: 'john101'
  }
  beforeAll(async () => {
    await request(baseUrl).post("/users").send(newItem)
  })
  afterAll(async () => {
    await request(baseUrl).delete(`/users/${newItem.id}`)
  })

  it("should update item if it exists", async () => {
    const res = await request(baseUrl).patch(`/users/${newItem.id}`)
      .send({
        id: 101,
        message: "updated using PATCH"
      })
    expect(res.statusCode).toBe(200)
    expect(res.body.id).toEqual(101)
    expect(res.body.username).toEqual('john101')
    expect(res.body.message).toEqual("updated using PATCH")
  })
})

describe("DELETE /users/:id", () => {
  const newItem = {
    id: 101,
    username: 'john101'
  }
  beforeAll(async () => {
    await request(baseUrl).post("/users").send(newItem)
  })
  it("should delete one item", async () => {
    const res = await request(baseUrl).delete(`/users/${newItem.id}`)
    expect(res.statusCode).toBe(200)

    const res2 = await request(baseUrl).get(`/users/${newItem.id}`)
    expect(res2.statusCode).toEqual(404)
  })
})