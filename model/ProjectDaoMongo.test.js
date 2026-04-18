// ProjectDaoMongo.test.js
// Automated Jest tests for the MongoDB DAO.
// Uses the TESTDB_URI from .env – never touches production.
// The test DB is wiped before each test to guarantee isolation.

require('dotenv').config();

const mongoose = require('mongoose');
const dao      = require('./ProjectDaoMongo');
const db       = require('./DbConnect');

// Sample data  ==============================
const sampleProject = {
  title: 'Little League Web App',
  owner: 'Dylan',
  type:  'Web App',
  stack: 'HTML, CSS, Bootstrap, Node.js',
  desc:  'Full-stack app showing live little league data.',
  img:   '',
  repo:  'https://github.com/example/little-league',
};


beforeAll(async () => {
  await db.connect('test');
}, 20000);

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}, 10000);

afterAll(async () => {
  await db.disconnect();
}, 10000);

// create ==============================

describe('create', () => {
  test('saves a new project and returns it with an _id', async () => {
    const saved = await dao.create(sampleProject);
    expect(saved._id).toBeDefined();
    expect(saved.title).toBe('Little League Web App');
    expect(saved.owner).toBe('Dylan');
  });

  test('persists the project so it appears in readAll', async () => {
    await dao.create(sampleProject);
    const all = await dao.readAll();
    expect(all.length).toBe(1);
  });

  test('throws a ValidationError when required fields are missing', async () => {
    await expect(dao.create({ title: 'Incomplete' })).rejects.toMatchObject({
      name: 'ValidationError',
    });
  });
});

// readAll  ==============================

describe('readAll', () => {
  test('returns an empty array when no projects exist', async () => {
    const all = await dao.readAll();
    expect(all).toEqual([]);
  });

  test('returns all inserted projects', async () => {
    await dao.create(sampleProject);
    await dao.create({ ...sampleProject, title: 'HVAC Inventory App', owner: 'Fabrizio' });
    const all = await dao.readAll();
    expect(all.length).toBe(2);
  });
});

// read  ==============================

describe('read', () => {
  test('returns the correct project for a valid id', async () => {
    const created = await dao.create(sampleProject);
    const found   = await dao.read(created._id.toString());
    expect(found).not.toBeNull();
    expect(found.title).toBe('Little League Web App');
  });

  test('returns null for a non-existent but valid ObjectId', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const found  = await dao.read(fakeId);
    expect(found).toBeNull();
  });

  test('returns null for a malformed id string', async () => {
    const found = await dao.read('not-an-object-id');
    expect(found).toBeNull();
  });
});

// update  ==============================

describe('update', () => {
  test('updates allowed fields and returns the new document', async () => {
    const created = await dao.create(sampleProject);
    const updated = await dao.update(created._id.toString(), { title: 'Updated Title' });
    expect(updated.title).toBe('Updated Title');
    expect(updated.owner).toBe('Dylan');
  });

  test('returns null when the id does not exist', async () => {
    const fakeId  = new mongoose.Types.ObjectId().toString();
    const updated = await dao.update(fakeId, { title: 'Ghost' });
    expect(updated).toBeNull();
  });

  test('returns null for a malformed id', async () => {
    const updated = await dao.update('bad-id', { title: 'X' });
    expect(updated).toBeNull();
  });
});

// delete  ==============================

describe('delete', () => {
  test('removes the project and returns the deleted document', async () => {
    const created = await dao.create(sampleProject);
    const deleted = await dao.delete(created._id.toString());
    expect(deleted).not.toBeNull();
    expect(deleted.title).toBe('Little League Web App');
    const all = await dao.readAll();
    expect(all.length).toBe(0);
  });

  test('returns null when the id does not exist', async () => {
    const fakeId  = new mongoose.Types.ObjectId().toString();
    const deleted = await dao.delete(fakeId);
    expect(deleted).toBeNull();
  });

  test('returns null for a malformed id', async () => {
    const deleted = await dao.delete('bad-id');
    expect(deleted).toBeNull();
  });
});

// readByOwner  ==============================

describe('readByOwner', () => {
  test('returns only projects belonging to the specified developer', async () => {
    await dao.create(sampleProject);
    await dao.create({ ...sampleProject, title: 'HVAC App', owner: 'Fabrizio' });
    const dylanProjects = await dao.readByOwner('Dylan');
    expect(dylanProjects.length).toBe(1);
    expect(dylanProjects[0].owner).toBe('Dylan');
  });

  test('returns an empty array when the developer has no projects', async () => {
    const result = await dao.readByOwner('Dylan');
    expect(result).toEqual([]);
  });
});

// readByType  ==============================

describe('readByType', () => {
  test('returns only projects of the specified type', async () => {
    await dao.create(sampleProject);
    await dao.create({ ...sampleProject, title: 'Malloc reimplementation', type: 'Systems' });
    const webApps = await dao.readByType('Web App');
    expect(webApps.length).toBe(1);
    expect(webApps[0].type).toBe('Web App');
  });

  test('returns an empty array when no projects match the type', async () => {
    const result = await dao.readByType('Mobile');
    expect(result).toEqual([]);
  });
});