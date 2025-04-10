-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2025 at 12:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sawarnidb2`
--

-- --------------------------------------------------------

--
-- Table structure for table `liked`
--

CREATE TABLE `liked` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `like_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `liked`
--

INSERT INTO `liked` (`user_id`, `post_id`, `like_datetime`) VALUES
(3, 1, '2025-04-10 22:38:13'),
(3, 3, '2025-04-10 22:38:15'),
(3, 4, '2025-04-10 22:38:12'),
(3, 8, '2025-04-10 22:38:18');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `senderid` int(11) NOT NULL,
  `receiverid` int(11) NOT NULL,
  `content` varchar(512) NOT NULL,
  `sent_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `senderid`, `receiverid`, `content`, `sent_at`) VALUES
(4, 1, 2, 'hello', '2025-04-11 00:34:46'),
(5, 1, 3, 'hi', '2025-04-11 00:35:12'),
(6, 1, 5, 'aa', '2025-04-11 00:37:12'),
(7, 1, 10, 'ddd', '2025-04-11 00:37:33');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `posted_by` int(11) NOT NULL,
  `text_content` varchar(1000) NOT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `creation_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `posted_by`, `text_content`, `image_url`, `creation_date`) VALUES
(1, 1, 'aaaa', NULL, '2025-04-10'),
(3, 2, 'fedzfgr gter g faef  razf za azdza ', NULL, '2025-04-10'),
(4, 2, 'hjfdhe bfhae vazgd iojdaz', NULL, '2025-04-10'),
(5, 2, 'fjuia fbghaf tvgaz', NULL, '2025-04-10'),
(8, 3, 'video', NULL, '2025-04-10');

-- --------------------------------------------------------

--
-- Table structure for table `postattachment`
--

CREATE TABLE `postattachment` (
  `post_id` int(11) DEFAULT NULL,
  `upload_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postattachment`
--

INSERT INTO `postattachment` (`post_id`, `upload_id`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 4),
(3, 5),
(4, 6),
(4, 7),
(5, 8),
(6, 9),
(7, 10),
(8, 11);

-- --------------------------------------------------------

--
-- Table structure for table `upload`
--

CREATE TABLE `upload` (
  `upload_id` int(11) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `upload`
--

INSERT INTO `upload` (`upload_id`, `file_path`, `file_type`) VALUES
(1, 'uploads/pexels-donaldtong94-55787.jpg', 'jpg'),
(2, 'uploads/pexels-photo-212324.webp', 'webp'),
(3, 'uploads/pexels-lum3n-44775-167684.jpg', 'jpg'),
(4, 'uploads/pexels-freestockpro-1227513.jpg', 'jpg'),
(5, 'uploads/pexels-lum3n-44775-167684.jpg', 'jpg'),
(6, 'uploads/pexels-brett-sayles-1431822.jpg', 'jpg'),
(7, 'uploads/pexels-eberhardgross-1367105.jpg', 'jpg'),
(8, 'uploads/pexels-lum3n-44775-167684.jpg', 'jpg'),
(9, 'uploads/vd.mp4', 'mp4'),
(10, 'uploads/pexels-brett-sayles-1431822.jpg', 'jpg'),
(11, 'uploads/vd.mp4', 'mp4');

-- --------------------------------------------------------

--
-- Table structure for table `useraccount`
--

CREATE TABLE `useraccount` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `join_date` date NOT NULL,
  `profile_picture_path` varchar(256) NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  `password` varchar(20) NOT NULL DEFAULT '0000',
  `aboutMe` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`user_id`, `user_name`, `join_date`, `profile_picture_path`, `location`, `password`, `aboutMe`) VALUES
(1, 'john_doe', '2022-01-15', 'uploads/image1.png', 'New York', '0000', ''),
(2, 'jane_smith', '2021-11-05', 'uploads/image1.png', 'Los Angeles', '0000', ''),
(3, 'mike_jones', '2023-03-22', 'uploads/image1.png', 'Chicago', '0000', ''),
(4, 'sarah_wilson', '2022-07-30', 'uploads/image1.png', 'Miami', '0000', ''),
(5, 'alex_green', '2023-01-10', 'uploads/image1.png', 'Seattle', '0000', ''),
(6, 'emily_brown', '2021-09-18', 'uploads/image1.png', 'Boston', '0000', ''),
(7, 'david_clark', '2022-05-12', 'uploads/image1.png', 'Austin', '0000', ''),
(8, 'lisa_taylor', '2023-02-28', 'uploads/image1.png', 'Denver', '0000', ''),
(9, 'kevin_lee', '2021-12-25', 'uploads/image1.png', 'San Francisco', '0000', ''),
(10, 'amy_adams', '2022-08-07', 'uploads/image1.png', 'Portland', '0000', '');

-- --------------------------------------------------------

--
-- Table structure for table `userresume`
--

CREATE TABLE `userresume` (
  `userId` int(11) NOT NULL,
  `uploadId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `liked`
--
ALTER TABLE `liked`
  ADD PRIMARY KEY (`user_id`,`post_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post_user` (`posted_by`);

--
-- Indexes for table `upload`
--
ALTER TABLE `upload`
  ADD PRIMARY KEY (`upload_id`);

--
-- Indexes for table `useraccount`
--
ALTER TABLE `useraccount`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `userresume`
--
ALTER TABLE `userresume`
  ADD PRIMARY KEY (`userId`,`uploadId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `upload`
--
ALTER TABLE `upload`
  MODIFY `upload_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `useraccount`
--
ALTER TABLE `useraccount`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_user` FOREIGN KEY (`posted_by`) REFERENCES `useraccount` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
