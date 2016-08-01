/**
 * JS-сапер.
 * User: ДенисВ 
 */

var gameVariant = "openField";

var VerticalCellCount = 10;     // Кол-во клеток по вертикали
var HorizontalCellCount = 10;   // Кол-во клеток по горизонтали
var MineCount = 10;             // Кол-во мин
var FoundMinesNumber;           // Кол-во найденных мин
var SetFlagsNumber;             // Кол-во поставленных флагов
var GameStatus;                 // Статус игры (0 - Начало игры, 1 - Игра, 2 - Результат)

var mineFieldArray = new Array(VerticalCellCount + 2);        // Игровое поле

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

/**
 * Инициализация игрового поля
 */
function initGameField()
{
   for (var i = 0; i < mineFieldArray.length; i++)
   {
      mineFieldArray[i] = new Array(HorizontalCellCount + 2);
   }

   for (var row = 0; row <= HorizontalCellCount + 1; row++)  // В неотображаемые клетки запишем -3
   {
      mineFieldArray[row][0] = -3;
      mineFieldArray[row][VerticalCellCount + 1] = -3;
   }

   for (var col = 0; col <= VerticalCellCount + 1; col++)
   {
      mineFieldArray[0][col] = -3;
      mineFieldArray[HorizontalCellCount + 1][col] = -3;
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

   for (row = 1; row <= VerticalCellCount; row++)  // очистить поле
   {
      for (col = 1; col <= HorizontalCellCount; col++)
      {
         mineFieldArray[row][col] = 0;
      }
   }

   do  // Расставим мины
   {
      row = Math.round(Math.random() * (VerticalCellCount - 1)) + 1;
      col = Math.round(Math.random() * (HorizontalCellCount - 1)) + 1;

      if (mineFieldArray[row][col] == 9)
      {
         continue;
      }
      mineFieldArray[row][col] = 9;
      n++;
   }
   while (n != MineCount);

   // Для каждой клетки вычислим кол-во мин в соседних клетках
   for (row = 1; row <= VerticalCellCount; row++)
   {
      for (col = 1; col <= HorizontalCellCount; col++)
      {
         if (mineFieldArray[row][col] == 9)
         {
            continue;
         }

         var k = 0;  // Количество мин в соседних клетках

         if (mineFieldArray[row - 1][col - 1] == 9)
            k++;
         if (mineFieldArray[row - 1][col] == 9)
            k++;
         if (mineFieldArray[row - 1][col + 1] == 9)
            k++;
         if (mineFieldArray[row][col - 1] == 9)
            k++;
         if (mineFieldArray[row][col + 1] == 9)
            k++;
         if (mineFieldArray[row + 1][col - 1] == 9)
            k++;
         if (mineFieldArray[row + 1][col] == 9)
            k++;
         if (mineFieldArray[row + 1][col + 1] == 9)
            k++;

         mineFieldArray[row][col] = k;
      }
   }

   GameStatus = 0;         // Начало игры
   FoundMinesNumber = 0;   // Нет обнаруженных мин
   SetFlagsNumber = 0;     // Нет поставленных флагов
}

/**
 * Рисует клетку
 * @param row Номер строки клетки
 * @param col Номер столбца клетки
 * @param gameStatus Статус игры
 */
function drawMineCell(row, col, gameStatus)
{
   var cellImage = document.images['rc' + row + col];
   var mineCell = mineFieldArray[row][col];

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
   for (var row = 1; row <= mineFieldArray.length - 1; row++)
   {
      for (var col = 1; col <= mineFieldArray[row].length - 1; col++)
      {
         if (mineFieldArray[row][col] % 10 == 9)
         {
            var cellImage = document.images['rc' + row + col];
            cellImage.src = BombImagePath;
         }
      }
   }
}

/**
 * Открытие клетки
 * @param row Номер строки клетки
 * @param col Номер столбца клетки
 */
function openMineCell(row, col)
{
   if (mineFieldArray[row][col] == 0)
   {
      mineFieldArray[row][col] = 100;
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
   else if ((mineFieldArray[row][col] < 100) && (mineFieldArray[row][col] != -3))
   {
      mineFieldArray[row][col] += 100;
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

   var cellImage = document.images['rc' + row + col];

   if (gameVariant == "openField")     // Открыть поле
   {
      if (mineFieldArray[row][col] == 9)  // Открыта клетка с миной
      {
         alert('You loose :(');
         mineFieldArray[row][col] += 100;
         GameStatus = 2;
         cellImage.src = BombImagePath;
         showMines();
      }
      else if (mineFieldArray[row][col] < 9)
      {
         openMineCell(row, col);
      }
   }
   else if (gameVariant == "setFlag")  // Пометить поле флажком
   {
      if (mineFieldArray[row][col] <= 9)
      {
         SetFlagsNumber += 1;         
         if (mineFieldArray[row][col] == 9)
         {
            FoundMinesNumber += 1;            
         }
         mineFieldArray[row][col] += 200;

         if ((FoundMinesNumber == MineCount) && (SetFlagsNumber == MineCount))   // Игра закончена
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
         if (mineFieldArray[row][col] >= 200)    // В клетке уже был поставлен флаг
         {
            SetFlagsNumber -= 1;
            mineFieldArray[row][col] -= 200;
            drawMineCell(row, col, GameStatus);
            cellImage.src = CloseImagePath;
         }
      }
   }
}