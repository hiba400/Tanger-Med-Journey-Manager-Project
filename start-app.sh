#!/bin/bash

echo "🚀 Starting TM Journey Manager Application..."

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ Port $1 is already in use"
        return 0
    else
        echo "❌ Port $1 is not in use"
        return 1
    fi
}

# Check if backend is running
if check_port 5000; then
    echo "✅ Backend server is already running on port 5000"
else
    echo "🔄 Starting backend server..."
    cd backend
    node server.js &
    cd ..
    sleep 3
fi

# Check if frontend is running
if check_port 3000; then
    echo "✅ Frontend server is already running on port 3000"
else
    echo "🔄 Starting frontend server..."
    cd frontend
    npm start &
    cd ..
    sleep 5
fi

echo ""
echo "🎉 TM Journey Manager is ready!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "🚛 Truck API: http://localhost:5000/truck"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Keep script running
wait 