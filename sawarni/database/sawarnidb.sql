-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2025 at 06:28 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `postattachment`
--

CREATE TABLE `postattachment` (
  `post_id` int(11) DEFAULT NULL,
  `upload_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `upload`
--

CREATE TABLE `upload` (
  `upload_id` int(11) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `cv_file_path` varchar(50) DEFAULT '',
  `about_me` varchar(1000) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`user_id`, `user_name`, `join_date`, `profile_picture_path`, `location`, `password`, `cv_file_path`, `about_me`) VALUES
(1, 'john_doe', '2022-01-15', 'uploads/image1.png', 'New York', '0000', '', ''),
(2, 'jane_smith', '2021-11-05', 'uploads/image1.png', 'Los Angeles', '0000', '', ''),
(3, 'mike_jones', '2023-03-22', 'uploads/image1.png', 'Chicago', '0000', '', ''),
(4, 'sarah_wilson', '2022-07-30', 'uploads/image1.png', 'Miami', '0000', '', ''),
(5, 'alex_green', '2023-01-10', 'uploads/image1.png', 'Seattle', '0000', '', ''),
(6, 'emily_brown', '2021-09-18', 'uploads/image1.png', 'Boston', '0000', '', ''),
(7, 'david_clark', '2022-05-12', 'uploads/image1.png', 'Austin', '0000', '', ''),
(8, 'lisa_taylor', '2023-02-28', 'uploads/image1.png', 'Denver', '0000', '', ''),
(9, 'kevin_lee', '2021-12-25', 'uploads/image1.png', 'San Francisco', '0000', '', ''),
(10, 'amy_adams', '2022-08-07', 'uploads/image1.png', 'Portland', '0000', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `liked`
--
ALTER TABLE `liked`
  ADD PRIMARY KEY (`user_id`,`post_id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `upload`
--
ALTER TABLE `upload`
  MODIFY `upload_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
