// Simple in-memory database for development/testing when MongoDB is not available
class MemoryDB {
  constructor() {
    this.data = {
      trucks: [],
      admins: [],
      drivers: [],
      requests: []
    };
    this.counters = {
      trucks: 0,
      admins: 0,
      drivers: 0,
      requests: 0
    };
  }

  // Initialize with some sample data
  initialize() {
    // Add sample admin
    this.data.admins.push({
      _id: 'admin1',
      name: 'Admin User',
      email: 'admin@tangermed.com',
      password: 'admin123',
      phone: '0500000000'
    });

    // Add sample truck
    this.data.trucks.push({
      _id: 'truck1',
      plate_number: 'TM-001-A',
      status: 'available'
    });

    console.log('Memory database initialized with sample data');
  }

  // Generic CRUD operations
  async find(collection, query = {}) {
    let items = this.data[collection] || [];
    
    // Simple query matching (for basic cases)
    if (Object.keys(query).length > 0) {
      items = items.filter(item => {
        return Object.keys(query).every(key => item[key] === query[key]);
      });
    }
    
    return items;
  }

  async findOne(collection, query) {
    const items = await this.find(collection, query);
    return items[0] || null;
  }

  async findById(collection, id) {
    const items = await this.find(collection);
    return items.find(item => item._id === id) || null;
  }

  async create(collection, data) {
    const newItem = {
      _id: `${collection}${++this.counters[collection]}`,
      ...data,
      __v: 0
    };
    
    this.data[collection].push(newItem);
    return newItem;
  }

  async findByIdAndUpdate(collection, id, updateData, options = {}) {
    const index = this.data[collection].findIndex(item => item._id === id);
    if (index === -1) return null;
    
    this.data[collection][index] = {
      ...this.data[collection][index],
      ...updateData
    };
    
    return options.new ? this.data[collection][index] : this.data[collection][index];
  }

  async findByIdAndDelete(collection, id) {
    const index = this.data[collection].findIndex(item => item._id === id);
    if (index === -1) return null;
    
    const deletedItem = this.data[collection][index];
    this.data[collection].splice(index, 1);
    return deletedItem;
  }

  async deleteMany(collection, query = {}) {
    const items = await this.find(collection, query);
    this.data[collection] = this.data[collection].filter(item => 
      !items.some(queryItem => queryItem._id === item._id)
    );
    return { deletedCount: items.length };
  }
}

module.exports = new MemoryDB(); 