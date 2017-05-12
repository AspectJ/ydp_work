package com.common.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

/**
 * 
 * 
 * <p>
 * Title：
 * </p>
 * <p>
 * Description：生成二维码的工具类
 * </p>
 * <p>
 * Author : 夏健美 2014-6-13
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */

public class ZxingUtil {
    /**
     * 
     * <p>
     * 作用描述：
     * </p>
     * <p>
     * 修改说明：
     * </p>
     * 
     * @param content--扫描后，显示文本的内容
     * @param width--目标图片的宽度
     * @param height--目标图片的高度
     * @param srcImagePath--源图片--把图片截取在二维码中间的源图片
     * @param destImagePath--目标图片
     *
     */
    public static void encode(String content, String tpContent,  
            String srcImagePath, String destImagePath,int width, int height,int image_width,int image_height,int image_half_width,int frame_width) {  
    	    if(content==null||srcImagePath==null||destImagePath==null){
    	    	return;
    	    }
        try {  
            ImageIO.write(genBarcode(content,tpContent, width, height, srcImagePath,image_width,image_height,image_half_width,frame_width),  
                    "png", new File(destImagePath));  
        } catch (IOException e) {  
            e.printStackTrace();  
        } catch (WriterException e) {  
            e.printStackTrace();  
        }  
    }  
    /**
     * 
     * <p>
     * 作用描述：生成二维码
     * </p>
     * <p>
     * 修改说明：
     * </p>
     * 
     * @param content  --扫描后，显示文本的内容
     * @param width--目标图片的宽度
     * @param height--目标图片的高度
     * @param srcImagePath--源图片--把图片截取在二维码中间的源图片
     * @return BufferedImage
     * @throws WriterException
     * @throws IOException
     *
     */
    private static BufferedImage genBarcode(String content, String tpContent,int width,  
            int height, String srcImagePath,int image_width,int image_height,int image_half_width,int frame_width) throws WriterException,  
            IOException {  
        // 读取源图像  
        BufferedImage scaleImage = scale(tpContent,srcImagePath, image_width,  
                image_height, true,content);  
        int[][] srcPixels = new int[image_width][image_height];  
        for (int i = 0; i < scaleImage.getWidth(); i++) {  
            for (int j = 0; j < scaleImage.getHeight(); j++) {  
                srcPixels[i][j] = scaleImage.getRGB(i, j);  
            }  
        }  
  
        Map<EncodeHintType, Object> hint = new HashMap<EncodeHintType, Object>();  
        hint.put(EncodeHintType.CHARACTER_SET, "utf-8");  //设置编码方式
        hint.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H); //设置纠错级别 
        BitMatrix matrix = new MultiFormatWriter().encode(content,
        	    BarcodeFormat.QR_CODE, width, height, hint);
  
        // 二维矩阵转为一维像素数组  
        int halfW = matrix.getWidth() / 2;  
        int halfH = matrix.getHeight() / 2;  
        int[] pixels = new int[width * height];  
  
        for (int y = 0; y < matrix.getHeight(); y++) {  
            for (int x = 0; x < matrix.getWidth(); x++) {  
                // 读取图片  
                if (x > halfW - image_half_width  
                        && x < halfW + image_half_width  
                        && y > halfH - image_half_width  
                        && y < halfH + image_half_width) {  
                    pixels[y * width + x] = srcPixels[x - halfW  
                            + image_half_width][y - halfH + image_half_width];  
                }   
                // 在图片四周形成边框  
                else if ((x > halfW - image_half_width - frame_width  
                        && x < halfW - image_half_width + frame_width  
                        && y > halfH - image_half_width - frame_width && y < halfH  
                        + image_half_width + frame_width)  
                        || (x > halfW + image_half_width - frame_width  
                                && x < halfW + image_half_width + frame_width  
                                && y > halfH - image_half_width - frame_width && y < halfH  
                                + image_half_width + frame_width)  
                        || (x > halfW - image_half_width - frame_width  
                                && x < halfW + image_half_width + frame_width  
                                && y > halfH - image_half_width - frame_width && y < halfH  
                                - image_half_width + frame_width)  
                        || (x > halfW - image_half_width - frame_width  
                                && x < halfW + image_half_width + frame_width  
                                && y > halfH + image_half_width - frame_width && y < halfH  
                                + image_half_width + frame_width)) {  
                    pixels[y * width + x] = 0xfffffff;  
                } else {  
                    // 此处可以修改二维码的颜色，可以分别制定二维码和背景的颜色；  
                    pixels[y * width + x] = matrix.get(x, y) ? 0xff000000  
                            : 0xfffffff;  
                }  
            }  
        }  
  
        BufferedImage image = new BufferedImage(width, height,  
                BufferedImage.TYPE_INT_RGB);  
        image.getRaster().setDataElements(0, 0, width, height, pixels);  
        
  
        return image;  
    }  
    /** 
     * 把传入的原始图像按高度和宽度进行缩放，生成符合要求的图标 
     *  
     * @param srcImageFile 
     *            源图片
     * @param height 
     *            目标高度 
     * @param width 
     *            目标宽度 
     * @param hasFiller 
     *            比例不对时是否需要补白：true为补白; false为不补白; 
     * @throws IOException 
     */  
    private static BufferedImage scale(String tpContent,String srcImageFile, int height,  
            int width, boolean hasFiller,String content) throws IOException {  
        double ratio = 0.0; // 缩放比例  
        File file = new File(srcImageFile);  
        BufferedImage srcImage = ImageIO.read(file);  
        java.awt.Image destImage = srcImage.getScaledInstance(width, height,  
                BufferedImage.SCALE_SMOOTH);  
        // 计算比例  
        if ((srcImage.getHeight() > height) || (srcImage.getWidth() > width)) {  
            if (srcImage.getHeight() > srcImage.getWidth()) {  
                ratio = (new Integer(height)).doubleValue()  
                        / srcImage.getHeight();  
            } else {  
                ratio = (new Integer(width)).doubleValue()  
                        / srcImage.getWidth();  
            }  
            AffineTransformOp op = new AffineTransformOp(  
                    AffineTransform.getScaleInstance(ratio, ratio), null);  
            destImage = op.filter(srcImage, null);  
        }  
        if (hasFiller) {// 补白  
            BufferedImage image = new BufferedImage(width, height,  
                    BufferedImage.TYPE_INT_RGB);  
            Graphics2D graphic = image.createGraphics();  
            Graphics2D g2=image.createGraphics();
            graphic.setColor(Color.white);  
            g2.fillRect(0, 0, width, height);  
            g2.setColor(Color.white);  
            g2.fillRect(0, 0, width, height); 
            if (width == destImage.getWidth(null))  {
                graphic.drawImage(destImage, 0,  
                        (height - destImage.getHeight(null)) / 2,  
                        destImage.getWidth(null), destImage.getHeight(null),  
                        Color.white, null);  
            }
            else { 
                graphic.drawImage(destImage,  
                        (width - destImage.getWidth(null)) / 2, 0,  
                        destImage.getWidth(null), destImage.getHeight(null),  
                        Color.white, null);  
            }
            
            //写入文字
            if(null!=tpContent||!"".equals(tpContent)){
	            g2.setFont(new Font("华文行楷", Font.PLAIN, 8));
	            g2.setColor(Color.BLACK);
	            g2.drawString(tpContent,0 , 10);
	            g2.dispose();
            }
            graphic.dispose();            
            destImage = image;  
        }  
        return (BufferedImage) destImage;  
    }  
    
    

	// 编码---针对没有图片的，只生成简单的二维码
    @SuppressWarnings("all")
	public static void encodeStr(String path, String str, Integer width, Integer height, Map hints) {
		BitMatrix byteMatrix;
		try {
			byteMatrix = new MultiFormatWriter().encode(
					new String(str.getBytes("utf-8"), "iso-8859-1"),
					BarcodeFormat.QR_CODE, width, height, hints);
			File file = new File(path);
			try {
				MatrixToImageWriter.writeToFile(byteMatrix, "png", file);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (WriterException e) {
			// TODO Auto-generated catch block
            e.printStackTrace();
		}

	}
}
