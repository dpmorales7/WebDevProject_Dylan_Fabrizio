//ProjectDaoJson Tests

const dao = require('./ProjectDaoJson');

test('readAll() returns a non-empty list', function () {
    expect(dao.readAll().length).toBeGreaterThan(0);
});

test('read() returns a project by id', function () {
    let mockProject = { title: 'Read Test', 
        owner: 'Tester', 
        type: 'Web App',
        stack: 'Node.js', 
        desc: 'Testing read', 
        img: '', 
        repo: '' };
    dao.create(mockProject);
    let project = dao.read(mockProject._id);
    expect(project).not.toBeNull();
    expect(project._id).toBe(mockProject._id);
    dao.delete(mockProject._id); 
});

test('read() returns null for invalid id', function () {
    let result = dao.read(-1);
    expect(result).toBeNull();
});

test('create() adds a new project', function () {
    let mockProject = { title: 'Create Test', 
        owner: 'Tester', 
        type: 'Web App',
        stack: 'Node.js', 
        desc: 'Testing create', 
        img: '', 
        repo: '' };
    let sizeBefore = dao.lstProjects.length;
    dao.create(mockProject);
    expect(dao.lstProjects.length).toBe(sizeBefore + 1);
    expect(dao.lstProjects).toContain(mockProject);
    dao.delete(mockProject._id);
});

test('create() assigns a unique incrementing _id', function () {
    let mockProject = { title: 'ID Test',
        owner: 'Tester', 
        type: 'Web App',
        stack: 'Node.js', 
        desc: 'Testing id', 
        img: '', 
        repo: '' };
    let lastId = dao.lstProjects[dao.lstProjects.length - 1]._id;
    dao.create(mockProject);
    expect(mockProject._id).toBe(lastId + 1);
    dao.delete(mockProject._id);
});

test('update() modifies an existing project', function () {
    let mockProject = { title: 'Update Test',
         owner: 'Tester',
         type: 'Web App',
         stack: 'Node.js', 
         desc: 'Testing update', 
         img: '',
         repo: '' };
    dao.create(mockProject);
    mockProject.title = 'Updated Title';
    let result = dao.update(mockProject);
    expect(result).not.toBeNull();
    expect(result.title).toBe('Updated Title');
    dao.delete(mockProject._id);
});

test('update() returns null for project that DNE', function () {
    let fakeProject = { _id: -1, title: 'Imaginary PJ' };
    let result = dao.update(fakeProject);
    expect(result).toBeNull();
});

test('delete() removes a project from the list', function () {
    let mockProject = { title: 'DTest', 
        owner: 'Tester', 
        type: 'Web App',
        stack: 'Node.js', 
        desc: 'Testing delete', 
        img: '', 
        repo: '' };
    dao.create(mockProject);
    let sizeBefore = dao.lstProjects.length;
    let deleted = dao.delete(mockProject._id);
    expect(deleted).not.toBeNull();
    expect(dao.lstProjects.length).toBe(sizeBefore - 1);
    expect(dao.read(mockProject._id)).toBeNull();
});

test('delete() returns null for id that DNE', function () {
    let result = dao.delete(-1);
    expect(result).toBeNull();
});