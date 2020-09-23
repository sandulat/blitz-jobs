# Migration `20200923150026-init`

This migration has been generated by sandulat at 9/23/2020, 6:00:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN')

CREATE TYPE "public"."JobType" AS ENUM ('FULLTIME', 'PARTTIME')

CREATE TABLE "public"."User" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"confirmedAt" timestamp(3)   ,
"name" text   ,
"email" text   NOT NULL ,
"hashedPassword" text   ,
"role" "UserRole"  NOT NULL DEFAULT E'USER',
PRIMARY KEY ("id")
)

CREATE TABLE "public"."UserConfirmationToken" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"token" text   NOT NULL ,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Job" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"publishedAt" timestamp(3)   ,
"company" text   NOT NULL ,
"position" text   NOT NULL ,
"tags" jsonb   NOT NULL ,
"type" "JobType"  NOT NULL DEFAULT E'FULLTIME',
"location" text   NOT NULL ,
"url" text   NOT NULL ,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Session" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"expiresAt" timestamp(3)   ,
"handle" text   NOT NULL ,
"userId" integer   ,
"hashedSessionToken" text   ,
"antiCSRFToken" text   ,
"publicData" text   ,
"privateData" text   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "UserConfirmationToken.token_unique" ON "public"."UserConfirmationToken"("token")

CREATE UNIQUE INDEX "Session.handle_unique" ON "public"."Session"("handle")

ALTER TABLE "public"."UserConfirmationToken" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Job" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Session" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200923150026-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,73 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = ["postgresql"]
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+// --------------------------------------
+
+enum UserRole {
+  USER
+  ADMIN
+}
+
+model User {
+  id             Int       @default(autoincrement()) @id
+  createdAt      DateTime  @default(now())
+  updatedAt      DateTime  @updatedAt
+  confirmedAt    DateTime?
+  name           String?
+  email          String    @unique
+  hashedPassword String?
+  role           UserRole  @default(USER)
+  sessions       Session[]
+}
+
+model UserConfirmationToken {
+  id             Int       @default(autoincrement()) @id
+  createdAt      DateTime  @default(now())
+  updatedAt      DateTime  @updatedAt
+  token          String    @unique
+  user           User      @relation(fields: [userId], references: [id])
+  userId         Int
+}
+
+enum JobType {
+  FULLTIME
+  PARTTIME
+}
+
+model Job {
+  id             Int       @default(autoincrement()) @id
+  createdAt      DateTime  @default(now())
+  updatedAt      DateTime  @updatedAt
+  publishedAt    DateTime?
+  company        String
+  position       String
+  tags           Json
+  type           JobType   @default(FULLTIME)
+  location       String
+  url            String
+  user           User      @relation(fields: [userId], references: [id])
+  userId         Int
+}
+
+model Session {
+  id                 Int       @default(autoincrement()) @id
+  createdAt          DateTime  @default(now())
+  updatedAt          DateTime  @updatedAt
+  expiresAt          DateTime?
+  handle             String    @unique
+  user               User?     @relation(fields: [userId], references: [id])
+  userId             Int?
+  hashedSessionToken String?
+  antiCSRFToken      String?
+  publicData         String?
+  privateData        String?
+}
```

