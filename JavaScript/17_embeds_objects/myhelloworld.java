import java.applet.Applet;
import java.awt.Graphics;
public class myhelloworld extends Applet {
	String message;
	public void init() {
		message = new String("Привет всем браузерам от Java!");
	}
	public void paint(Graphics myScreen) {
		myScreen.drawString(message, 25, 25);
	}
	public void setMessage(String newMessage) {
		message = newMessage;
		repaint();
	}
}