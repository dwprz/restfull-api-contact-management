# Initialisasi Project
npm init

# Install JOI For Validation
npm i joi

# Install Express JS & Type Express JS For Auto Complete
npm i express
npm i --save-dev @types/express

# Install ORM Prisma
npm i --save-dev prisma

# Install Winston For Logger
npm i winston

# Install BCRYPT For Hashing
npm i bcrypt
npm i --save-dev @types/bcrypt

# Install UUID For Create ID Unique
npm i uuid
npm i --save-dev @types/uuid

# Install Jest For Unit Test
npm i --save-dev jest @types/jest

# Install Babel For Jest
npm install --save-dev babel-jest
more: https://babeljs.io/setup#installation
# (Tambahakan jest -i di package.json) Agar unit testnya dijalankan secara squential supaya menghindari race condition, karena secara default jest dijalankan secara parallel
jest -i

# Install Supertest For Express
npm i --save-dev supertest @types/supertest

# Run MySQL Docker Compose
cd docker
docker compose create
docker compose start
docker compose down
# If MySQL Client In Docker
docker exec -it mysql-contact-management mysql -u root -p

# Migrate Prisma
npx prisma migrate dev --create-only
# Next
npx prisma migrate dev 