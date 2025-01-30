/**
 * Логика сапера
 * User: ДенисВ
 * Date: 06.07.13
 * Time: 1:28
 */

var BombImagePath = "images/bomb.jpg";
var CloseImagePath = "images/close.jpg";
var FlagImagePath = "images/flag.jpg";
var OpenImagePath = "images/open.gif";

var ImagePathArray = [];
ImagePathArray[101] = "images/1.gif";
ImagePathArray[102] = "images/2.gif";
ImagePathArray[103] = "images/3.png";
ImagePathArray[104] = "images/4.gif";
ImagePathArray[105] = "images/5.gif";
ImagePathArray[106] = "images/6.gif";
ImagePathArray[107] = "images/7.gif";
ImagePathArray[108] = "images/8.gif";

var GameVariant;           // Вариант игры: openField - открыть поле, setFlag - поставить флаг
var GridDimension;         // Размерность сетки игрового поля
var MineCount;             // Кол-во мин
var FoundMinesNumber;      // Кол-во найденных мин
var SetFlagsNumber;        // Кол-во поставленных флагов
var GameStatus;            // Статус игры. 0 - Начало, 1 - Процесс, 2 - Конец
var MineFieldArray = [];   // Игровое поле

/**
 * Инициализация игрового поля
 * @param gridDimension Размер сетки
 * @param mineCount Кол-во мин
 */
function initGameField(gridDimension, mineCount)
{
   GameVariant = "openField";
   GridDimension = gridDimension;
   MineCount = mineCount;

   MineFieldArray = new Array(GridDimension + 2);

   for (var i = 0; i < MineFieldArray.length; i++)
   {
      MineFieldArray[i] = new Array(GridDimension + 2);
   }

   for (var row = 0; row <= GridDimension + 1; row++)  // В неотображаемые клетки запишем -3
   {
      MineFieldArray[row][0] = -3;
      MineFieldArray[row][GridDimension + 1] = -3;
   }

   for (var col = 0; col <= GridDimension + 1; col++)
   {
      MineFieldArray[0][col] = -3;
      MineFieldArray[GridDimension + 1][col] = -3;
   }

   newGame();
}

/**
 * Новая игра
 */
function newGame()
{
   var row, col;   // индексы клетки
   var n = 0;      // кол-во поставленных мин

   for (row = 1; row <= GridDimension; row++)  // очистить поле
   {
      for (col = 1; col <= GridDimension; col++)
      {
         MineFieldArray[row][col] = 0;
      }
   }

   do  // Расставим мины
   {
      row = Math.round(Math.random() * (GridDimension - 1)) + 1;
      col = Math.round(Math.random() * (GridDimension - 1)) + 1;

      if (MineFieldArray[row][col] == 9)
      {
         continue;
      }
      MineFieldArray[row][col] = 9;
      n++;
   }
   while (n != MineCount);

   // Для каждой клетки вычислим кол-во мин в соседних клетках
   for (row = 1; row <= GridDimension; row++)
   {
      for (col = 1; col <= GridDimension; col++)
      {
         if (MineFieldArray[row][col] == 9)
         {
            continue;
         }

         var k = 0;  // Количество мин в соседних клетках

         if (MineFieldArray[row - 1][col - 1] == 9)
            k++;
         if (MineFieldArray[row - 1][col] == 9)
            k++;
         if (MineFieldArray[row - 1][col + 1] == 9)
            k++;
         if (MineFieldArray[row][col - 1] == 9)
            k++;
         if (MineFieldArray[row][col + 1] == 9)
            k++;
         if (MineFieldArray[row + 1][col - 1] == 9)
            k++;
         if (MineFieldArray[row + 1][col] == 9)
            k++;
         if (MineFieldArray[row + 1][col + 1] == 9)
            k++;

         MineFieldArray[row][col] = k;
      }
   }

   GameStatus = 0;         // Начало игры
   FoundMinesNumber = 0;   // Нет обнаруженных мин
   SetFlagsNumber = 0;     // Нет поставленных флагов
}

/**
 * Отображение клетки
 * @param row Номер строки клетки
 * @param col Номер столбца клетки
 * @param gameStatus Статус игры
 */
function drawMineCell(row, col, gameStatus)
{
   var cellImage = document.images['rc' + row + col];
   var mineCell = MineFieldArray[row][col];

   if (mineCell >= 100 && mineCell < 200)  // Открытые или помеченные клетки
   {
      cellImage.src = mineCell == 109 ? BombImagePath : OpenImagePath;
      if (mineCell >= 101 && mineCell <= 108) // В соседних клетках есть мины
      {
         cellImage.src = ImagePathArray[mineCell];
      }
   }
   else if (mineCell >= 200)   // В клетке флажок
   {
      cellImage.src = FlagImagePath;
   }

   if ((gameStatus == 2) && (mineCell % 10 == 9))  // Игра завершена - покажем мины
   {
      showMines();
   }
}

/**
 * Показать все мины
 */
function showMines()
{
   for (var row = 1; row <= MineFieldArray.length - 1; row++)
   {
      for (var col = 1; col <= MineFieldArray[row].length - 1; col++)
      {
         if (MineFieldArray[row][col] % 10 == 9)
         {
            var cellImage = document.images['rc' + row + col];
            cellImage.src = BombImagePath;
         }
      }
   }
}

/**
 * Открыть клетку
 * @param row Номер строки
 * @param col Номер столбца
 */
function openMineCell(row, col)
{
   if (MineFieldArray[row][col] == 0)
   {
      MineFieldArray[row][col] = 100;
      drawMineCell(row, col, GameStatus); // Отобразить содержимое клетки

      openMineCell(row, col - 1);         // Открыть клетки слева, справа, сверху, снизу,..
      openMineCell(row - 1, col);
      openMineCell(row, col + 1);
      openMineCell(row + 1, col);

      openMineCell(row - 1, col - 1);     // .. примыкающие диагонально
      openMineCell(row - 1, col + 1);
      openMineCell(row + 1, col - 1);
      openMineCell(row + 1, col + 1);
   }
   else if ((MineFieldArray[row][col] < 100) && (MineFieldArray[row][col] != -3))
   {
      MineFieldArray[row][col] += 100;
      drawMineCell(row, col, GameStatus); // Отобразить содержимое клетки
   }
}

/**
 * Контроллер игры
 * @param row Номер строки
 * @param col Номер столбца
 */
function gameController(row, col)
{
   if (GameStatus == 2)
      return;
   if (GameStatus == 0)
      GameStatus = 1;

   var imageSuffixId = 'rc';
   imageSuffixId += parseInt(row);
   imageSuffixId += parseInt(col);
   var cellImage = document.images[imageSuffixId];

   if (GameVariant == "openField")     // Открыть поле
   {
      if (MineFieldArray[row][col] == 9)  // Открыта клетка с миной
      {
         alert('You loose :(');
         MineFieldArray[row][col] += 100;
         GameStatus = 2;
         cellImage.src = BombImagePath;
         showMines();
      }
      else if (MineFieldArray[row][col] < 9)
      {
         openMineCell(row, col);
      }
   }
   else if (GameVariant == "setFlag")  // Пометить поле флажком
   {
      if (MineFieldArray[row][col] <= 9)
      {
         SetFlagsNumber += 1;
         if (MineFieldArray[row][col] == 9)
         {
            FoundMinesNumber += 1;
         }
         MineFieldArray[row][col] += 200;

         if ((FoundMinesNumber >= MineCount) && (SetFlagsNumber == MineCount))   // Игра закончена
         {
            GameStatus = 2;
            alert('You won :)');
         }
         else // Перерисовываем только клетку
         {
            drawMineCell(row, col, GameStatus);
         }
         cellImage.src = FlagImagePath;
      }
      else
      {
         if (MineFieldArray[row][col] >= 200)    // В клетке уже был поставлен флаг
         {
            SetFlagsNumber -= 1;
            MineFieldArray[row][col] -= 200;
            drawMineCell(row, col, GameStatus);
            cellImage.src = CloseImagePath;
         }
      }
   }
}