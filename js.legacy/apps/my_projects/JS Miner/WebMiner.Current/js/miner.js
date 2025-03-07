/**
 * ������ ������
 * User: ������
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

var GameVariant;           // ������� ����: openField - ������� ����, setFlag - ��������� ����
var GridDimension;         // ����������� ����� �������� ����
var MineCount;             // ���-�� ���
var FoundMinesNumber;      // ���-�� ��������� ���
var SetFlagsNumber;        // ���-�� ������������ ������
var GameStatus;            // ������ ����. 0 - ������, 1 - �������, 2 - �����
var MineFieldArray = [];   // ������� ����

/**
 * ������������� �������� ����
 * @param gridDimension ������ �����
 * @param mineCount ���-�� ���
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

   for (var row = 0; row <= GridDimension + 1; row++)  // � �������������� ������ ������� -3
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
 * ����� ����
 */
function newGame()
{
   var row, col;   // ������� ������
   var n = 0;      // ���-�� ������������ ���

   for (row = 1; row <= GridDimension; row++)  // �������� ����
   {
      for (col = 1; col <= GridDimension; col++)
      {
         MineFieldArray[row][col] = 0;
      }
   }

   do  // ��������� ����
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

   // ��� ������ ������ �������� ���-�� ��� � �������� �������
   for (row = 1; row <= GridDimension; row++)
   {
      for (col = 1; col <= GridDimension; col++)
      {
         if (MineFieldArray[row][col] == 9)
         {
            continue;
         }

         var k = 0;  // ���������� ��� � �������� �������

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

   GameStatus = 0;         // ������ ����
   FoundMinesNumber = 0;   // ��� ������������ ���
   SetFlagsNumber = 0;     // ��� ������������ ������
}

/**
 * ����������� ������
 * @param row ����� ������ ������
 * @param col ����� ������� ������
 * @param gameStatus ������ ����
 */
function drawMineCell(row, col, gameStatus)
{
   var cellImage = document.images['rc' + row + col];
   var mineCell = MineFieldArray[row][col];

   if (mineCell >= 100 && mineCell < 200)  // �������� ��� ���������� ������
   {
      cellImage.src = mineCell == 109 ? BombImagePath : OpenImagePath;
      if (mineCell >= 101 && mineCell <= 108) // � �������� ������� ���� ����
      {
         cellImage.src = ImagePathArray[mineCell];
      }
   }
   else if (mineCell >= 200)   // � ������ ������
   {
      cellImage.src = FlagImagePath;
   }

   if ((gameStatus == 2) && (mineCell % 10 == 9))  // ���� ��������� - ������� ����
   {
      showMines();
   }
}

/**
 * �������� ��� ����
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
 * ������� ������
 * @param row ����� ������
 * @param col ����� �������
 */
function openMineCell(row, col)
{
   if (MineFieldArray[row][col] == 0)
   {
      MineFieldArray[row][col] = 100;
      drawMineCell(row, col, GameStatus); // ���������� ���������� ������

      openMineCell(row, col - 1);         // ������� ������ �����, ������, ������, �����,..
      openMineCell(row - 1, col);
      openMineCell(row, col + 1);
      openMineCell(row + 1, col);

      openMineCell(row - 1, col - 1);     // .. ����������� �����������
      openMineCell(row - 1, col + 1);
      openMineCell(row + 1, col - 1);
      openMineCell(row + 1, col + 1);
   }
   else if ((MineFieldArray[row][col] < 100) && (MineFieldArray[row][col] != -3))
   {
      MineFieldArray[row][col] += 100;
      drawMineCell(row, col, GameStatus); // ���������� ���������� ������
   }
}

/**
 * ���������� ����
 * @param row ����� ������
 * @param col ����� �������
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

   if (GameVariant == "openField")     // ������� ����
   {
      if (MineFieldArray[row][col] == 9)  // ������� ������ � �����
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
   else if (GameVariant == "setFlag")  // �������� ���� �������
   {
      if (MineFieldArray[row][col] <= 9)
      {
         SetFlagsNumber += 1;
         if (MineFieldArray[row][col] == 9)
         {
            FoundMinesNumber += 1;
         }
         MineFieldArray[row][col] += 200;

         if ((FoundMinesNumber >= MineCount) && (SetFlagsNumber == MineCount))   // ���� ���������
         {
            GameStatus = 2;
            alert('You won :)');
         }
         else // �������������� ������ ������
         {
            drawMineCell(row, col, GameStatus);
         }
         cellImage.src = FlagImagePath;
      }
      else
      {
         if (MineFieldArray[row][col] >= 200)    // � ������ ��� ��� ��������� ����
         {
            SetFlagsNumber -= 1;
            MineFieldArray[row][col] -= 200;
            drawMineCell(row, col, GameStatus);
            cellImage.src = CloseImagePath;
         }
      }
   }
}