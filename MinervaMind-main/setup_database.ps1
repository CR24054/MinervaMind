$env:PGPASSWORD = "12345"
$pgPath = "C:\Program Files\PostgreSQL\17\bin"

# Create the database
Write-Host "Checking if database exists..."
& "$pgPath\psql.exe" -U postgres -h localhost -p 5432 -d postgres -c "SELECT 1 FROM pg_database WHERE datname = 'minervamind'" 

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database minervamind already exists"
} else {
    Write-Host "Creating minervamind database..."
    & "$pgPath\psql.exe" -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE minervamind;"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Database created successfully"
    } else {
        Write-Host "Error creating database"
        exit 1
    }
}

# Verify connection
Write-Host "Verifying connection to minervamind..."
& "$pgPath\psql.exe" -U postgres -h localhost -p 5432 -d minervamind -c "SELECT 1"

if ($LASTEXITCODE -eq 0) {
    Write-Host "TEST SUCCESSFUL: Connection to minervamind works!"
} else {
    Write-Host "Error connecting to minervamind"
    exit 1
}
