package com.common.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.WritableRaster;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;

/**
 * 
 * 
 * <p>
 * Title：图片工具类
 * </p>
 * <p>
 * Description：
 * </p>
 * <p>
 * Author :administrator 2013-3-4
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class ImageUtil {

	/**
	 * 
	 * <p>
	 * 作用描述：截取图片方法
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param imgFile
	 *            图片file
	 * @param x
	 *            截取图片起始x坐标
	 * @param y
	 *            截取图片起始y坐标
	 * @param x2
	 *            截取图片终点x坐标
	 * @param y2
	 *            截取图片终点y坐标
	 * @return
	 * @throws IOException
	 * 
	 */
	public static byte[] cutImageFile(File srcImage, int x, int y, int x2,
			int y2) throws IOException {

		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		BufferedImage sourceImage = ImageIO.read(srcImage);

		// 根据截图范围获取截图
		BufferedImage subImg = sourceImage
				.getSubimage(x, y, (x2 - x), (y2 - y));

		// 获取原图的文件名
		String imgName = srcImage.getName();

		// 获取原图的文件类型
		String imgType = imgName.substring(imgName.lastIndexOf(".") + 1);

		// 将截图写入数组流
		IIOImage image = new IIOImage(subImg, null, null);
		ImageIO.write(image.getRenderedImage(), imgType, bos);

		return bos.toByteArray();
	}

	/**
	 * 
	 * <p>
	 * 作用描述：缩放图片
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param srcImage
	 *            图片源文件
	 * @param width
	 *            缩放后的图片宽度
	 * @param height
	 *            缩放后的图片高度
	 * @return
	 * @throws IOException
	 * 
	 */
	public static byte[] resizeImg(File srcImage, int width, int height)
			throws IOException {
		BufferedImage srcBufImage = ImageIO.read(srcImage);
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		// 获原图的文件名
		String imgName = srcImage.getName();

		// 获取原图的文件类型
		String imgType = imgName.substring(imgName.lastIndexOf(".") + 1);

		BufferedImage targetImg = resizeImg0(srcBufImage, width, height);

		// 将缩放后的图写入数组流
		IIOImage image = new IIOImage(targetImg, null, null);
		ImageIO.write(image.getRenderedImage(), imgType, bos);

		return bos.toByteArray();
	}

	// 缩放图片的内部实现
	private static BufferedImage resizeImg0(BufferedImage srcBufImage,
			int width, int height) throws IOException {

		BufferedImage bufTarget = null;

		double sx = (double) width / srcBufImage.getWidth();
		double sy = (double) height / srcBufImage.getHeight();

		int type = srcBufImage.getType();
		if (type == BufferedImage.TYPE_CUSTOM) {
			ColorModel cm = srcBufImage.getColorModel();
			WritableRaster raster = cm.createCompatibleWritableRaster(width,
					height);
			boolean alphaPremultiplied = cm.isAlphaPremultiplied();
			bufTarget = new BufferedImage(cm, raster, alphaPremultiplied, null);
		} else
			bufTarget = new BufferedImage(width, height, type);

		Graphics2D g = bufTarget.createGraphics();
		g.setRenderingHint(RenderingHints.KEY_RENDERING,
				RenderingHints.VALUE_RENDER_QUALITY);
		g.drawRenderedImage(srcBufImage,
				AffineTransform.getScaleInstance(sx, sy));
		g.dispose();
		return bufTarget;
	}

	/**
	 * 
	 * <p>
	 * 作用描述：旋转图片
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param srcImage
	 *            图片源文件
	 * @param degree
	 *            旋转角度
	 * @param bgcolor
	 *            旋转后的填充背景颜色
	 * @return
	 * @throws IOException
	 * 
	 */
	public static byte[] rotateImg(File srcImage, int degree, Color bgcolor)
			throws IOException {
		BufferedImage srcBufImage = ImageIO.read(srcImage);
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		// 获原图的文件名
		String imgName = srcImage.getName();

		// 获取原图的文件类型
		String imgType = imgName.substring(imgName.lastIndexOf(".") + 1);

		BufferedImage targetImg = rotateImg0(srcBufImage, degree, bgcolor);

		// 将缩放后的图写入数组流
		IIOImage image = new IIOImage(targetImg, null, null);
		ImageIO.write(image.getRenderedImage(), imgType, bos);

		return bos.toByteArray();
	}

	// 旋转图片内部实现
	private static BufferedImage rotateImg0(BufferedImage srcBufImage,
			int degree, Color bgcolor) throws IOException {

		int iw = srcBufImage.getWidth();// 原始图象的宽度
		int ih = srcBufImage.getHeight();// 原始图象的高度
		int w = 0;
		int h = 0;
		int x = 0;
		int y = 0;
		degree = degree % 360;
		if (degree < 0)
			degree = 360 + degree;// 将角度转换到0-360度之间
		double ang = Math.toRadians(degree);// 将角度转为弧度

		/**
		 * 确定旋转后的图象的高度和宽度
		 */

		if (degree == 180 || degree == 0 || degree == 360) {
			w = iw;
			h = ih;
		} else if (degree == 90 || degree == 270) {
			w = ih;
			h = iw;
		} else {
			int d = iw + ih;
			w = (int) (d * Math.abs(Math.cos(ang)));
			h = (int) (d * Math.abs(Math.sin(ang)));
		}

		x = (w / 2) - (iw / 2);// 确定原点坐标
		y = (h / 2) - (ih / 2);
		BufferedImage rotatedImage = new BufferedImage(w, h,
				srcBufImage.getType());
		Graphics2D gs = (Graphics2D) rotatedImage.getGraphics();
		if (bgcolor == null) {
			bgcolor = new Color(255, 255, 255);
		}
		gs.setColor(bgcolor);
		gs.fillRect(0, 0, w, h);// 以给定颜色绘制旋转后图片的背景

		AffineTransform at = new AffineTransform();
		at.rotate(ang, w / 2, h / 2);// 旋转图象
		at.translate(x, y);
		AffineTransformOp op = new AffineTransformOp(at,
				AffineTransformOp.TYPE_BICUBIC);
		op.filter(srcBufImage, rotatedImage);

		return rotatedImage;
	}

	/**
	 * 
	 * <p>
	 * 作用描述：缩放旋转剪切图片
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param imgFile
	 *            源图片 截取图片起始x坐标
	 * @param y
	 *            截取图片起始y坐标
	 * @param x2
	 *            截取图片终点x坐标
	 * @param y2
	 *            截取图片终点y坐标
	 * @param zoomWidth
	 *            图片缩放后的宽
	 * @param zoomHeight
	 *            图片缩放后的高
	 * @param degree
	 *            旋转的角度
	 * @param bgcolor
	 *            旋转填充的背景颜色（如果为null,则默认填充白色）
	 * @return
	 * @throws IOException
	 * 
	 */
	public static byte[] zoomRotateCutImageFile(File srcImage, int x, int y,
			int x2, int y2, int zoomWidth, int zoomHeight, int degree,
			Color bgcolor) throws IOException {
		try {

			// 算出最终图片的宽和高
			int targetW = x2 - x;
			int targetH = y2 - y;

			// 读取原图片
			BufferedImage srcBufImage = ImageIO.read(srcImage);

			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			// 获原图的文件名
			String imgName = srcImage.getName();

			// 获取原图的文件类型
			String imgType = imgName.substring(imgName.lastIndexOf(".") + 1);

			BufferedImage targetImg = null;

			// 先缩放
			targetImg = resizeImg0(srcBufImage, zoomWidth, zoomHeight);

			// // 图片缩放后的宽和高
			// int w1 = targetImg.getWidth();
			// int h1 = targetImg.getHeight();

			// 再旋转
			targetImg = rotateImg0(targetImg, degree, bgcolor);

			// // 图片旋转后的宽和高
			// int w2 = targetImg.getWidth();
			// int h2 = targetImg.getHeight();
			//
			// // 在旋转后重算剪切的x,y坐标
			// int diffW = Math.abs(w2 - w1) / 2;
			// int diffH = Math.abs(h2 - h1) / 2;
			//
			// x = Math.abs(w2 < w1 ? x - diffW : x + diffW);
			// y = Math.abs(h2 < h1 ? y - diffH : y + diffH);

			// 说明： 由于旋转后的图片的x,y切图起点坐标已经在前台算好了，所以在后台不用再算
			// 故上面的代码被注释掉了，直接用前台传来的x,y进行切图就可以了

			// 最后剪切
			targetImg = targetImg.getSubimage(x, y, targetW, targetH);

			// 将最终的图写入数组流
			IIOImage image = new IIOImage(targetImg, null, null);
			ImageIO.write(image.getRenderedImage(), imgType, bos);

			return bos.toByteArray();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// public static void main(String[] args) throws IOException {
	// System.out.println(Math.toRadians(10));
	// System.out.println(2 * Math.PI / 360 * 10);
	// byte[] b = null;
	// FileOutputStream fos = null;
	//
	// b = ImageUtil.cutImageFile(new File("c:/1.jpg"), 0, 0, 50, 50);
	// fos = new FileOutputStream(new File("c:/2.jpg"));
	// fos.write(b);
	// fos.close();
	//
	// b = ImageUtil.resizeImg(new File("c:/1.jpg"), 1500, 1500);
	//
	// fos = new FileOutputStream(new File("c:/3.jpg"));
	// fos.write(b);
	// fos.close();
	//
	// b = ImageUtil.rotateImg(new File("c:/1.jpg"), 30, null);
	// fos = new FileOutputStream(new File("c:/4.jpg"));
	// fos.write(b);
	// fos.close();
	//
	// b = ImageUtil.zoomRotateCutImageFile(new File("c:/1.jpg"), 0, 0, 800,
	// 600, 1500, 1500, 90, null);
	// fos = new FileOutputStream(new File("c:/5.jpg"));
	// fos.write(b);
	// fos.close();

	// }
}
