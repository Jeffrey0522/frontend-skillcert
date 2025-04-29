BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Course] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Course_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MarketplaceTransaction] (
    [id] INT NOT NULL IDENTITY(1,1),
    [buyerId] INT NOT NULL,
    [courseId] INT NOT NULL,
    [amount] INT NOT NULL,
    [currency] NVARCHAR(1000) NOT NULL,
    [transactionHash] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [MarketplaceTransaction_status_df] DEFAULT 'Pending',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MarketplaceTransaction_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [MarketplaceTransaction_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Module] (
    [id] BIGINT NOT NULL,
    [course_id] BIGINT NOT NULL,
    [name] VARBINARY(max) NOT NULL,
    [position] INT NOT NULL,
    [description] VARBINARY(max) NOT NULL,
    CONSTRAINT [Module_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ModuleProgress] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [module_id] BIGINT NOT NULL,
    [progress] INT NOT NULL CONSTRAINT [ModuleProgress_progress_df] DEFAULT 0,
    [completed] BIT NOT NULL CONSTRAINT [ModuleProgress_completed_df] DEFAULT 0,
    [last_access_at] BIGINT NOT NULL,
    [created_at] BIGINT NOT NULL,
    [updated_at] BIGINT NOT NULL,
    CONSTRAINT [ModuleProgress_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ModuleProgress_user_id_module_id_key] UNIQUE NONCLUSTERED ([user_id],[module_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[MarketplaceTransaction] ADD CONSTRAINT [MarketplaceTransaction_buyerId_fkey] FOREIGN KEY ([buyerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MarketplaceTransaction] ADD CONSTRAINT [MarketplaceTransaction_courseId_fkey] FOREIGN KEY ([courseId]) REFERENCES [dbo].[Course]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ModuleProgress] ADD CONSTRAINT [ModuleProgress_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ModuleProgress] ADD CONSTRAINT [ModuleProgress_module_id_fkey] FOREIGN KEY ([module_id]) REFERENCES [dbo].[Module]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
