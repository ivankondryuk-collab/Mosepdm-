generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  role          Role      @default(ADMIN)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  image       String?
  order       Int       @default(0)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id             String         @id @default(cuid())
  name           String
  slug           String         @unique
  sku            String         @unique
  description    String
  shortDesc      String?
  price          Float?
  priceOnRequest Boolean        @default(false)
  inStock        Boolean        @default(true)
  images         String[]
  thickness      String?
  composition    String?
  coverType      String?
  colorRange     String?
  series         ProductSeries?
  surfaceType    String?
  popular        Boolean        @default(false)
  featured       Boolean        @default(false)
  categoryId     String
  category       Category       @relation(fields: [categoryId], references: [id])
  orderItems     OrderItem[]
  certDocs       String[]
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
}

model Order {
  id          String      @id @default(cuid())
  orderNumber String      @unique
  status      OrderStatus @default(NEW)
  firstName   String
  lastName    String
  email       String
  phone       String
  address     String?
  comment     String?
  totalAmount Float
  items       OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Float
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
}

model PriceRequest {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String
  company     String?
  message     String?
  processed   Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model CalculatorRequest {
  id           String   @id @default(cuid())
  objectType   String
  area         Float
  thickness    Float
  coverSeries  String?
  needSubstrate Boolean  @default(false)
  needGlue     Boolean  @default(false)
  needPrimer   Boolean  @default(false)
  crumbs       Float
  glue         Float?
  primer       Float?
  totalCost    Float?
  name         String?
  email        String?
  phone        String?
  processed    Boolean  @default(false)
  createdAt    DateTime @default(now())
}

model ContactRequest {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  message   String?
  processed Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Article {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String
  image       String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  author      String   @default("Редакция MOSEPDM")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String?
  category    String
  area        Float?
  city        String?
  year        Int?
  images      String[]
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Role {
  ADMIN
  SUPER_ADMIN
}

enum OrderStatus {
  NEW
  PROCESSING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

enum ProductSeries {
  STANDARD
  CLASSIC
  COMFORT
  SPORT
}
