-- CreateTable
CREATE TABLE "ResetSenhaToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetSenhaToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetSenhaToken_email_key" ON "ResetSenhaToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResetSenhaToken_token_key" ON "ResetSenhaToken"("token");

-- CreateIndex
CREATE INDEX "ResetSenhaToken_email_idx" ON "ResetSenhaToken"("email");

-- CreateIndex
CREATE INDEX "ResetSenhaToken_token_idx" ON "ResetSenhaToken"("token");
