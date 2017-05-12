<%@ page contentType="image/jpeg; charset=UTF-8" import="java.awt.*,
java.awt.image.*,java.util.*,javax.imageio.*,com.common.util.CacheUtil" %>
<%!
Color getRandColor(int fc,int bc)
{
Random random = new Random();
if(fc>255) fc=255;
if(bc>255) bc=255;
int r=fc+random.nextInt(bc-fc);
int g=fc+random.nextInt(bc-fc);
int b=fc+random.nextInt(bc-fc);
return new Color(r,g,b);
} 
%>
<%
String codeKey=request.getParameter("codeKey");
out.clear();//这句针对resin服务器，如果是tomacat可以不要这句
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);

int width=60, height=22;
BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);


Graphics g = image.getGraphics();
Random random = new Random();

g.setColor(getRandColor(200,250));
g.fillRect(0, 0, width, height);

g.setFont(new Font("Times New Roman",Font.PLAIN,18));



//g.setColor(getRandColor(160,200));
//for (int i=0;i<155;i++)
//{
//int x = random.nextInt(width);
//int y = random.nextInt(height);
//int xl = random.nextInt(12);
//int yl = random.nextInt(12);
//g.drawLine(x,y,x+xl,y+yl);
//}

//数字验证码
//String sRand="";
//for (int i=0;i<4;i++){
//String rand=String.valueOf(random.nextInt(10));
//sRand+=rand;

//字母数字验证码
char c[] = new char[10];

//for (int i = 97, j = 0; i < 123; i++, j++) {
//c[j] = (char) i;
//}
//for (int o = 65, p = 26; o < 91; o++, p++) {
//c[p] = (char) o;
//}

for (int m = 48, n = 0; m < 58; m++, n++) {
c[n] = (char) m;
}
String sRand="";
for (int i=0;i<4;i++){
int x = random.nextInt(10);
String rand=String.valueOf(c[x]);
sRand+=rand;



g.setColor(new Color(20+random.nextInt(110),20+random.nextInt(110),20+random.nextInt(110)));
g.drawString(rand,13*i+6,16);
}

// 将认证码存入SESSION
//session.setAttribute("rand",sRand);
CacheUtil.put("codeCache", codeKey, sRand);
//Cookie cook = new Cookie("code",sRand);
//response.addCookie(cook);

g.dispose();

ImageIO.write(image, "JPEG", response.getOutputStream());

out.clear();
out = pageContext.pushBody();
//在页面上调用  <img src="/yourPath/checkNum.jsp" />

%>
