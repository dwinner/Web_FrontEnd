<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Less.Default" %>
<%@ Import Namespace="System.Web.Optimization" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <%: Styles.Render("~/Less") %>    
    <title>Layout example</title>
</head>
<body>
<div id="xMain">
    <div id="xHeader">
        <h1 align="center">Page Header</h1>
        <table class="xButtons">
            <tr>
                <td>Button1</td>
                <td>Button2</td>
                <td>Button3</td>
                <td>Button4</td>
                <td>Button5</td>
                <td>Button6</td>
            </tr>
        </table>
    </div>
    <div id="xLeft">
        <ul>
            <li>
                <a href="">Link1</a>
            </li>
            <li>
                <a href="">Link2</a>
            </li>
            <li>
                <a href="">Link3</a>
            </li>
            <li>
                <a href="">Link4</a>
            </li>
            <li>
                <a href="">Link5</a>
            </li>
            <li>
                <a href="">Link6</a>
            </li>
            <li>
                <a href="">Link7</a>
            </li>
            <li>
                <a href="">Link8</a>
            </li>
            <li>
                <a href="">Link9</a>
            </li>
        </ul>
    </div>
    <div id="xRight">
        <ul>
            <li>
                <a href="">Link1</a>
            </li>
            <li>
                <a href="">Link2</a>
            </li>
            <li>
                <a href="">Link3</a>
            </li>
            <li>
                <a href="">Link4</a>
            </li>
            <li>
                <a href="">Link5</a>
            </li>
            <li>
                <a href="">Link6</a>
            </li>
            <li>
                <a href="">Link7</a>
            </li>
            <li>
                <a href="">Link8</a>
            </li>
            <li>
                <a href="">Link9</a>
            </li>
        </ul>
    </div>
    <div id="xCenter">
        <div id="topContent">
            Content Header
        </div>
        <hr/>
        <div id="bottomContent">
            Programmer's Klondike - электронная библиотека программиста. Здесь Вы
            сможете огромное количество книг разной тематики совершенно бесплатно.
            На сайте имеются следующие разделы:
        </div>
    </div>
    <div id="xBottom">
        <table class="xButtons">
            <tr>
                <td>Button1</td>
                <td>Button2</td>
                <td>Button3</td>
                <td>Button4</td>
                <td>Button5</td>
                <td>Button6</td>
            </tr>
        </table>
        <h1 align="center">Page Footer</h1>
    </div>
</div>
</body>
</html>