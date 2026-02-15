-- Create Database
CREATE DATABASE IF NOT EXISTS `task_management_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `task_management_db`;

-- Create Task Table
CREATE TABLE `tasks_task` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `priority` varchar(20) NOT NULL DEFAULT 'medium',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `due_date` datetime(6),
  PRIMARY KEY (`id`),
  KEY `tasks_task_status` (`status`),
  KEY `tasks_task_created_at` (`created_at`),
  KEY `tasks_task_priority` (`priority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Indexes
CREATE INDEX `idx_status_created` ON `tasks_task` (`status`, `created_at` DESC);
CREATE INDEX `idx_priority` ON `tasks_task` (`priority`);
CREATE INDEX `idx_due_date` ON `tasks_task` (`due_date`);

-- Insert Sample Data (Optional)
INSERT INTO `tasks_task` (`title`, `description`, `status`, `priority`, `created_at`, `updated_at`, `due_date`) 
VALUES 
('Welcome to Task Management', 'This is your first task. You can edit, delete, or mark it as complete!', 0, 'high', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY)),
('Learn React', 'Understand React hooks, components, and state management', 0, 'medium', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY)),
('Study Django REST Framework', 'Learn about serializers, viewsets, and authentication', 0, 'medium', NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY));