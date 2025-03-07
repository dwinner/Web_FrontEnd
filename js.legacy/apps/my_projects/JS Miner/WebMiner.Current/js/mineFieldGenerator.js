/**
 * Генератор минного поля.
 * User: ДенисВ
 * Date: 05.07.13
 * Time: 23:32
 */

/**
 * Проверка строки на целое число
 * @param intStr Входная строка
 * @return boolean если intStr целое число, false в противном случае
 */
function isInteger(intStr)
{
   return /^\d+$/.test(intStr);
}

function generateMineField()
{
   var gridDimension = document.paramForm.gridDimension.value;
   var mineCount = document.paramForm.mineCount.value;

   var rightFrame = top.rightFrame;
   var mineFormContent = rightFrame.document.getElementById('mineFormContent');
   var mineFieldContent = rightFrame.document.getElementById('mineFieldId');

   if (!isInteger(gridDimension) || !isInteger(mineCount))
   {
      showErrorMessage('Incorrect parameters: ' + gridDimension + ' or ' + mineCount);
      return;
   }

   gridDimension = parseInt(gridDimension);
   mineCount = parseInt(mineCount);
   if (gridDimension > 0 && mineCount > 0)
   {
      if (mineCount > gridDimension * gridDimension)
      {
         showErrorMessage('Error. too much mines: ' + mineCount);
         return;
      }
      errorContent.innerHTML = "";
      mineFormContent.style.visibility = 'visible';
      rightFrame.document.mineForm.reset();
      mineFieldContent.innerHTML = generateMineFieldTable(gridDimension, gridDimension);
      rightFrame.initGameField(gridDimension, mineCount);
   }
   else
      showErrorMessage('Incorrect parameters: ' + gridDimension + ' or ' + mineCount);
}

function showErrorMessage(msg)
{
   var rightFrame = top.rightFrame;
   var errorContent = document.getElementById('errorContent');
   var mineFormContent = rightFrame.document.getElementById('mineFormContent');
   var mineFieldContent = rightFrame.document.getElementById('mineFieldId');

   errorContent.innerHTML = msg;
   mineFormContent.style.visibility = 'hidden';
   mineFieldContent.innerHTML = "";
}

function generateMineFieldTable(rowCount, columnCount)
{
   var content = '<table align="center" cellpadding="0" cellspacing="0" border="1" bgcolor="white">';
   for (var row = 1; row <= rowCount; row++)
   {
      content += "<tr>";
      for (var col = 1; col <= columnCount; col++)
      {
         content += '<td>';
         content += '<a href="#" onclick="gameController(' + row + ', ' + col + ');">';
         var imgSuffixId = 'rc';
         imgSuffixId += row;
         imgSuffixId += col;
         content += '<img src="images/close.jpg" border="0" name="' + imgSuffixId + '" alt=""/>';
         content += '</a>';
         content += '</td>';
      }
      content += "</tr>";
   }
   content += '</table>';

   return content;
}