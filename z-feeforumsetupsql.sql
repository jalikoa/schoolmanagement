-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2025 at 07:01 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `feeforum`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notificationtitle` text NOT NULL,
  `notificationsender` varchar(100) NOT NULL,
  `notificationcategory` varchar(100) NOT NULL,
  `notificationmessage` varchar(1500) NOT NULL,
  `notificationtype` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `notificationtitle`, `notificationsender`, `notificationcategory`, `notificationmessage`, `notificationtype`, `created_at`) VALUES
(1, 'Prepare exams', 'igongo@gmail.com', 'warning', 'Hey there please take note of this I will collect all the books on Monday so please take note of this please', 'Primary-3', '2024-11-29 14:03:42'),
(2, 'Disease outbreak', 'jalikoa@gmail.com', 'danger', 'Take note there is an outbreak of disease and all students are therefore required to take good note of themselves and get to be clean to avoid the drastic spread of such disease', 'All students', '2024-11-30 04:01:30');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `amountpaid` varchar(100) NOT NULL,
  `datepaid` date NOT NULL,
  `grade` varchar(100) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `payerregno` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `name`, `amountpaid`, `datepaid`, `grade`, `uid`, `payerregno`, `created_at`) VALUES
(1, 'Calvince Owino', '12890', '2024-11-02', 'Primary-3', '689500056', 'LK-6394', '2024-11-29 14:01:30'),
(4, 'James Ochieng', '56890', '2024-11-29', 'Primary-3', '200124353', 'EDU/9876', '2024-11-29 14:12:29'),
(5, 'Calvince Owino', '12890', '2024-11-29', 'Primary-1', '083667306', 'EDU/9876', '2024-11-29 14:17:57'),
(6, 'Calvince Owino Jalikoa', '11125', '2024-11-23', 'Primary-3', '444197685', 'LK-6291', '2024-11-30 04:08:37'),
(7, 'igongo@gmail.com', '10113', '2024-11-01', 'Primary-5', '651416185', 'LK-3457', '2024-11-30 07:32:39'),
(8, 'Jefter Okoth', '18235', '2024-11-07', 'Primary-3', '672770956', 'LK-1111', '2024-11-30 15:44:00'),
(9, 'Michael Wanjala', '4567', '2024-12-03', 'Primary-2', '212596529', 'TLE/6394', '2024-12-11 16:30:37');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `useremail` varchar(100) NOT NULL,
  `usergrade` varchar(15) NOT NULL,
  `usercontact` varchar(30) NOT NULL,
  `usergender` varchar(20) NOT NULL,
  `userregno` varchar(20) NOT NULL,
  `userpassword` varchar(500) NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `username`, `useremail`, `usergrade`, `usercontact`, `usergender`, `userregno`, `userpassword`, `registered_at`) VALUES
(1, 'James Owino', 'james@gmail.com', 'Primary-3', '0799311413', 'male', 'LK-6394', '$2y$10$sxj8Uxd3aGPgRS3FREdOU.Q6559rqGESR7RGHFQzEuOfqR8a3v61W', '2024-11-29 13:59:16'),
(3, 'Calvince Owino Jalikoa', 'sharon234@gmail.com', 'Primary-3', '0700827433', 'male', 'LK-6291', '$2y$10$lGtg1G7InFvQys46oiWM9OcvmSthSCglvefhyHAbwXzZp5LfZCVIO', '2024-11-30 04:05:49'),
(4, 'Jefter Okoth', 'jef@gmail.com', 'Primary-3', '0700827432', 'male', 'LK-1111', '$2y$10$.P7vOXlWwNI7Y54UKCu8UuIo/Sqb7b.Pxq5wzs7DPJEfkinaXarGu', '2024-11-30 04:11:52');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `useremail` varchar(100) NOT NULL,
  `usercontact` varchar(100) NOT NULL,
  `class` varchar(15) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `username`, `useremail`, `usercontact`, `class`, `password`, `created_at`) VALUES
(1, 'Hans Jalikoa', 'jalikoa@gmail.com', '0723767599', 'Primary-3', '$2y$10$QeZ.NKMY/SI0B0kSGs7Xs.kG2rQrqGbQIxiHQpY1rBf7DIr3orkay', '2024-11-29 14:01:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `useremail` (`useremail`),
  ADD UNIQUE KEY `usercontact` (`usercontact`),
  ADD UNIQUE KEY `userregno` (`userregno`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `useremail` (`useremail`),
  ADD UNIQUE KEY `usercontact` (`usercontact`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
