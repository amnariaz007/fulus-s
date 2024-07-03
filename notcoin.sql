-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:8889
-- Время создания: Май 18 2024 г., 10:57
-- Версия сервера: 5.7.39
-- Версия PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `notcoin`
--

-- --------------------------------------------------------

--
-- Структура таблицы `payouts`
--

CREATE TABLE `payouts` (
  `id` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `token` text NOT NULL,
  `network` text NOT NULL,
  `count` float NOT NULL,
  `address` text NOT NULL,
  `createdTime` bigint(20) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0 - ожидание\r\n1 - выполнено\r\n-1 - отменен'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `system`
--

CREATE TABLE `system` (
  `id` int(11) NOT NULL,
  `totalClicks` bigint(20) NOT NULL DEFAULT '0',
  `admins` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `system`
--

INSERT INTO `system` (`id`, `totalClicks`, `admins`) VALUES
(1, 140, '[435635239]');

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `channelAddress` text,
  `title` text,
  `link` text,
  `award` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `channelAddress`, `title`, `link`, `award`) VALUES
(3, NULL, 'Subscribe X', 'https://x.com/coin', 5000),
(4, '@channel', 'Subscribe channel', NULL, 10000);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `tgId` bigint(20) NOT NULL,
  `level` int(11) NOT NULL DEFAULT '0',
  `gold` int(11) NOT NULL DEFAULT '0',
  `usdt` float NOT NULL DEFAULT '0',
  `energyLeft` int(11) NOT NULL,
  `dailyEnergy` int(11) NOT NULL,
  `rechargingEnergyPerSecond` int(11) NOT NULL DEFAULT '1',
  `lastRestoreEnergyTime` bigint(20) NOT NULL,
  `invitedTgId` bigint(11) DEFAULT NULL,
  `completedTasks` text NOT NULL,
  `boosts` text NOT NULL,
  `registerTime` bigint(11) NOT NULL,
  `lastActivityTime` bigint(11) NOT NULL,
  `language` text NOT NULL,
  `goldPerClick` int(11) NOT NULL DEFAULT '1',
  `autoclickEndTime` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `payouts`
--
ALTER TABLE `payouts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `system`
--
ALTER TABLE `system`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tgId` (`tgId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `payouts`
--
ALTER TABLE `payouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `system`
--
ALTER TABLE `system`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
