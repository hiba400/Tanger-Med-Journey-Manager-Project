#!/bin/bash

echo "🚛 TM Journey Manager - Startup Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${GREEN}✅ Port $1 is already in use${NC}"
        return 0
    else
        echo -e "${RED}❌ Port $1 is not in use${NC}"
        return 1
    fi
}

# Function to test API endpoint
test_api() {
    local endpoint=$1
    local description=$2
    echo -e "${BLUE}Testing $description...${NC}"
    if curl -s "http://localhost:5000$endpoint" >/dev/null; then
        echo -e "${GREEN}✅ $description is working${NC}"
        return 0
    else
        echo -e "${RED}❌ $description is not responding${NC}"
        return 1
    fi
}

echo ""
echo -e "${YELLOW}🔍 Checking current status...${NC}"

# Check if backend is running
if check_port 5000; then
    echo -e "${GREEN}✅ Backend server is running on port 5000${NC}"
else
    echo -e "${YELLOW}🔄 Starting backend server...${NC}"
    cd backend
    node server.js &
    cd ..
    sleep 3
fi

# Check if frontend is running
if check_port 3000; then
    echo -e "${GREEN}✅ Frontend server is running on port 3000${NC}"
else
    echo -e "${YELLOW}🔄 Starting frontend server...${NC}"
    cd frontend
    npm start &
    cd ..
    sleep 5
fi

echo ""
echo -e "${YELLOW}🧪 Testing API endpoints...${NC}"

# Test API endpoints
test_api "/" "Backend server"
test_api "/truck" "Truck API"
test_api "/driver" "Driver API"
test_api "/admin" "Admin API"

echo ""
echo -e "${YELLOW}📊 Database Status:${NC}"

# Get database status
echo -e "${BLUE}Fetching current data...${NC}"
TRUCKS=$(curl -s http://localhost:5000/truck | jq 'length' 2>/dev/null || echo "0")
DRIVERS=$(curl -s http://localhost:5000/driver | jq 'length' 2>/dev/null || echo "0")
ADMINS=$(curl -s http://localhost:5000/admin | jq 'length' 2>/dev/null || echo "0")

echo -e "${GREEN}📦 Trucks: $TRUCKS records${NC}"
echo -e "${GREEN}👨‍💼 Drivers: $DRIVERS records${NC}"
echo -e "${GREEN}👨‍💻 Admins: $ADMINS records${NC}"

echo ""
echo -e "${GREEN}🎉 TM Journey Manager is ready!${NC}"
echo ""
echo -e "${BLUE}🌐 Access your application:${NC}"
echo -e "${GREEN}   Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}   Backend API: http://localhost:5000${NC}"
echo ""
echo -e "${BLUE}🔑 Login Credentials:${NC}"
echo -e "${GREEN}   Email: admin@tangermed.com${NC}"
echo -e "${GREEN}   Password: admin123${NC}"
echo ""
echo -e "${BLUE}📋 Available Features:${NC}"
echo -e "${GREEN}   ✅ Truck Management${NC}"
echo -e "${GREEN}   ✅ Driver Management${NC}"
echo -e "${GREEN}   ✅ Request Management${NC}"
echo -e "${GREEN}   ✅ Admin Dashboard${NC}"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo -e "${BLUE}   • Open http://localhost:3000 in your browser${NC}"
echo -e "${BLUE}   • Use the login credentials above${NC}"
echo -e "${BLUE}   • All your existing data is preserved in MongoDB Atlas${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"

# Keep script running
wait 