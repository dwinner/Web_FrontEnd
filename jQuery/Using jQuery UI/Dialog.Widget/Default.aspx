<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Dialog.Widget.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />    
    <meta name="description" content="The description of my page" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    
    <title>Progress bar widget</title>
    <style type="text/css">
        li {
            list-style-type: circle;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">        
        <ul>
            <asp:Repeater runat="server" ItemType="System.String" SelectMethod="GetHtmlLinks">
                <ItemTemplate>
                    <li><a href="<%# Item %>" target="blank"><%# GetItemName(Item) %></a></li>
                </ItemTemplate>
            </asp:Repeater>
        </ul>
    </form>
</body>
</html>
