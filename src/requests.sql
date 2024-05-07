-- Триггеры --------------------------------

-- Следим за изменением таблицы banks
DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `investment_back`.`banks_update_logs` BEFORE UPDATE ON `banks` FOR EACH ROW
BEGIN
INSERT INTO logs SET old_bank_name=OLD.Name, ID_bank=OLD.ID_bank, msg='upd';
END$$

-- Следим за удалением в таблице banks
DELIMITER $$
USE `investment_back`$$
CREATE DEFINER = CURRENT_USER TRIGGER `investment_back`.`banks_delete_logs` BEFORE DELETE ON `banks` FOR EACH ROW
BEGIN
INSERT INTO logs SET old_bank_name=OLD.Name, ID_bank=OLD.ID_bank, msg='del';
END$$

-- Следим за созданием в таблице banks
DELIMITER $$
USE `investment_back`$$
CREATE DEFINER = CURRENT_USER TRIGGER `investment_back`.`banks_insert_logs` AFTER INSERT ON `banks` FOR EACH ROW
BEGIN
INSERT INTO logs SET ID_bank=NEW.ID_bank, msg='ins';
END$$

-- Процедура на получение списка сотрудников
CREATE PROCEDURE `get_staff_procedure` ()
BEGIN
SELECT * FROM staff;
END

-- Процедура на добавление нового сотрудника
CREATE PROCEDURE `add_staff_procedure` (
IN id_bank int,
IN job_title VARCHAR(45),
IN num INT,
IN fio VARCHAR(99))
BEGIN
INSERT INTO staff (ID_bank, Job_title, Number, FIO) 
VALUES (id_bank, job_title, num, fio);
END

-- Процедура на изменение должности сотрудника
CREATE PROCEDURE `change_staffs_position_procedure` (
IN id INT,
IN new_job_title VARCHAR(45))
BEGIN
UPDATE staff SET Job_title=new_job_title WHERE ID_employee=id;
END

-- Процедура на удаление сотрудника
-- CREATE PROCEDURE `delete_staff_procedure` (
-- IN id INT)
-- BEGIN
-- DELETE FROM staff WHERE ID_employee=id;
-- END

-- Представление securities
CREATE VIEW `securities_view` AS
SELECT s.Sumdeal, s.Client, s.Rating, s.Profit 
FROM securities s
ORDER BY s.Client

-- Представление investments
CREATE VIEW `investment_view` AS
SELECT i.Client, i.Buydate, i.Selldate
FROM investments i
ORDER BY i.Client

-- Представление 
CREATE VIEW `logs_first_bank_view` AS
SELECT l.old_bank_name, l.msg
FROM logs l
WHERE l.ID_bank = 1;
