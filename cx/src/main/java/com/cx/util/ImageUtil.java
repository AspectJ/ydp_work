package com.cx.util;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;



import javax.imageio.ImageIO;

import org.apache.commons.fileupload.FileItem;

public class ImageUtil {
	
	/**
	 *模块：公司动态、新闻中心
       尺寸：310*145
	 * @param f 
	 * @return
	 */
    public void companyAndNewsImg_310_145(FileItem f,String classpath,String filename){

    	InputStream input;
    	String name = filename;
    	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
           
		try {
			input = f.getInputStream();
			BufferedImage oldImage = ImageIO.read(input);
		//	System.out.println(oldImage.getHeight());
			BufferedImage newImage = new  BufferedImage(310,145,BufferedImage.TYPE_INT_RGB);
			Graphics2D g = newImage.createGraphics();
			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
			g.dispose();
			newImage.getGraphics().drawImage( oldImage.getScaledInstance(310, 145, Image.SCALE_SMOOTH), 0, 0, null); 
		     
			
			 ImageIO.write(newImage, "jpg" , new File(path + name));  
		   //   System.out.println(name + path);
		      newImage.flush();
		      input.close();
		     
		} catch (IOException e) {
			e.printStackTrace();
		}
			
    }  
    
   /**
    * 模块：院线资质   尺寸：290*180
    * @param FileItem数据源
    * @param 服务器绝对路径
    * @param 文件名
    */
    public void theaterChainQualification_290_180(FileItem f,String classpath,String filename){
    	InputStream input;
    	String name = filename;
    	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
           
		try {
			input = f.getInputStream();
			BufferedImage oldImage = ImageIO.read(input);
			System.out.println(oldImage.getHeight());
			BufferedImage newImage = new  BufferedImage(290,180,BufferedImage.TYPE_INT_RGB);
			Graphics2D g = newImage.createGraphics();
			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
			g.dispose();
			newImage.getGraphics().drawImage( oldImage.getScaledInstance(290, 180, Image.SCALE_SMOOTH), 0, 0, null); 
		     
			
			 ImageIO.write(newImage, "jpg" , new File(path + name));  
		      System.out.println(name + path);
		      newImage.flush();
		      input.close();
		     
		} catch (IOException e) {
			e.printStackTrace();
		}
			
    }
    
    /**
     * 模块：最新活动  尺寸 ：1190*90
     * @param FileItem数据源
     * @param 服务器绝对路径
     * @param 文件名
     */
     public void latestActivity_1190_90(FileItem f,String classpath,String filename){
    	 
     	InputStream input;
     	String name = filename;
     	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
            
 		try {
 			input = f.getInputStream();
 			BufferedImage oldImage = ImageIO.read(input);
 		//	System.out.println(oldImage.getHeight());
 			BufferedImage newImage = new  BufferedImage(1190,90,BufferedImage.TYPE_INT_RGB);
 			Graphics2D g = newImage.createGraphics();
 			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
 			g.dispose();
 			newImage.getGraphics().drawImage( oldImage.getScaledInstance(1190, 90, Image.SCALE_SMOOTH), 0, 0, null); 
 		     
 			
 			 ImageIO.write(newImage, "jpg" , new File(path + name));  
 		 //     System.out.println(name + path);
 		      newImage.flush();
 		      input.close();
 		     
 		} catch (IOException e) {
 			e.printStackTrace();
 		}
 			
     }
     /**
      * 模块：加盟影院展示  尺寸 ：200*200
      * @param FileItem数据源
      * @param 服务器绝对路径
      * @param 文件名
      */
//      public void joinCinema_200_200(FileItem f,String classpath,String filename){
//      	InputStream input;
//      	String name = filename;
//      	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
//             
//  		try {
//  			input = f.getInputStream();
//  			BufferedImage oldImage = ImageIO.read(input);
//  		//	System.out.println(oldImage.getHeight());
//  			BufferedImage newImage = new  BufferedImage(200,200,BufferedImage.TYPE_INT_RGB);
//  			Graphics2D g = newImage.createGraphics();
//  			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
//  			g.dispose();
//  			newImage.getGraphics().drawImage( oldImage.getScaledInstance(200, 200, Image.SCALE_SMOOTH), 0, 0, null); 
//  		     
//  			
//  			 ImageIO.write(newImage, "jpg" , new File(path + name));  
//  		//      System.out.println(name + path);
//  		      newImage.flush();
//  		      input.close();
//  		     
//  		} catch (IOException e) {
//  			e.printStackTrace();
//  		}
//  			
//      }
     
   /**
    * 压缩图片比例为16:9
    * @param f
    * @param classpath
    * @param filename
    */
   public void joinCinema_16_9(FileItem f,String classpath,String filename){
	InputStream input;
	String name = filename;
	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
      
	try {
		input = f.getInputStream();
		BufferedImage oldImage = ImageIO.read(input);
	//	System.out.println(oldImage.getHeight());
		BufferedImage newImage = new  BufferedImage(oldImage.getWidth(),(int)(oldImage.getWidth()*((float) 9)/16),BufferedImage.TYPE_INT_RGB);
		Graphics2D g = newImage.createGraphics();
		g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
		g.dispose();
		newImage.getGraphics().drawImage( oldImage.getScaledInstance(oldImage.getWidth(),(int)(oldImage.getWidth()*((float) 9)/16), Image.SCALE_SMOOTH), 0, 0, null); 
	     
		
		 ImageIO.write(newImage, "jpg" , new File(path + name));  
	//      System.out.println(name + path);
	      newImage.flush();
	      input.close();
	     
	} catch (IOException e) {
		e.printStackTrace();
	}
		
}
   
 
   /**
    * 压缩图片比例为8:3
    * @param f
    * @param classpath
    * @param filename
    */
   public void Carousel_8_3(FileItem f,String classpath,String filename){
	InputStream input;
	String name = filename;
	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
      
	try {
		input = f.getInputStream();
		BufferedImage oldImage = ImageIO.read(input);
	//	System.out.println(oldImage.getHeight());
		BufferedImage newImage = new  BufferedImage(oldImage.getWidth(),(int)(oldImage.getWidth()*((float) 3)/8),BufferedImage.TYPE_INT_RGB);
		Graphics2D g = newImage.createGraphics();
		g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
		g.dispose();
		newImage.getGraphics().drawImage( oldImage.getScaledInstance(oldImage.getWidth(),(int)(oldImage.getWidth()*((float) 3)/8), Image.SCALE_SMOOTH), 0, 0, null); 
	     
		
		 ImageIO.write(newImage, "jpg" , new File(path + name));  
	//      System.out.println(name + path);
	      newImage.flush();
	      input.close();
	     
	} catch (IOException e) {
		e.printStackTrace();
	}
		
}
   
      /**
       * 模块:  公司动态、新闻详情   尺寸 ：900*585 (顶部)【省略】
       * @param FileItem数据源
       * @param 服务器绝对路径
       * @param 文件名
       */
       public void companyDetailsAndNewsDetails_900_585(FileItem f,String classpath,String filename){
       	InputStream input;
       	String name = filename;
       	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
              
   		try {
   			input = f.getInputStream();
   			BufferedImage oldImage = ImageIO.read(input);
   			System.out.println(oldImage.getHeight());
   			BufferedImage newImage = new  BufferedImage(900,585,BufferedImage.TYPE_INT_RGB);
   			Graphics2D g = newImage.createGraphics();
   			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
   			g.dispose();
   			newImage.getGraphics().drawImage( oldImage.getScaledInstance(900, 585, Image.SCALE_SMOOTH), 0, 0, null); 
   		     
   			
   			 ImageIO.write(newImage, "jpg" , new File(path + name));  
   		      System.out.println(name + path);
   		      newImage.flush();
   		      input.close();
   		     
   		} catch (IOException e) {
   			e.printStackTrace();
   		}
   			
       }
       /**
        * 模块：公司动态 、新闻详情 （子图）  尺寸 ：788*480
        * @param FileItem数据源
        * @param 服务器绝对路径
        * @param 文件名
        */
        public void childrenImage(FileItem f,String classpath,String filename){
        	InputStream input;
        	String name = filename;
        	String path = classpath+Constant.image+Constant.news_info+Constant.news_content;
               
    		try {
    			input = f.getInputStream();
    			BufferedImage oldImage = ImageIO.read(input);
    		//	System.out.println(oldImage.getHeight());
    			BufferedImage newImage = new  BufferedImage(788,480,BufferedImage.TYPE_INT_RGB);
    			Graphics2D g = newImage.createGraphics();
    			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
    			g.dispose();
    			newImage.getGraphics().drawImage( oldImage.getScaledInstance(788, 480, Image.SCALE_SMOOTH), 0, 0, null); 
    		     
    			
    			 ImageIO.write(newImage, "jpg" , new File(path + name));  
    		 //     System.out.println(name + path);
    		      newImage.flush();
    		      input.close();
    		     
    		} catch (IOException e) {
    			e.printStackTrace();
    		}
    			
        }
        /**
         * 模块：影院环境展示 (284*154  两张) 
         * @param FileItem数据源
         * @param 服务器绝对路径
         * @param 文件名
         */
         public void cinemaStyle_284_154(FileItem f,String classpath,String filename){
         	InputStream input;
         	String name = filename;
         	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
                
     		try {
     			input = f.getInputStream();
     			BufferedImage oldImage = ImageIO.read(input);
     		//	System.out.println(oldImage.getHeight());
     			BufferedImage newImage = new  BufferedImage(284,154,BufferedImage.TYPE_INT_RGB);
     			Graphics2D g = newImage.createGraphics();
     			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
     			g.dispose();
     			newImage.getGraphics().drawImage( oldImage.getScaledInstance(284, 154, Image.SCALE_SMOOTH), 0, 0, null); 
     		     
     			
     			 ImageIO.write(newImage, "jpg" , new File(path + name));  
     		//      System.out.println(name + path);
     		      newImage.flush();
     		      input.close();
     		     
     		} catch (IOException e) {
     			e.printStackTrace();
     		}
     			
         }
         /**
          * 模块：影院环境展示 (186*120  三张) 
          * @param FileItem数据源
          * @param 服务器绝对路径
          * @param 文件名
          */
          public void cinemaStyle_186_120(FileItem f,String classpath,String filename){
          	InputStream input;
          	String name = filename;
          	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
                 
      		try {
      			input = f.getInputStream();
      			BufferedImage oldImage = ImageIO.read(input);
      			System.out.println(oldImage.getHeight());
      			BufferedImage newImage = new  BufferedImage(186,120,BufferedImage.TYPE_INT_RGB);
      			Graphics2D g = newImage.createGraphics();
      			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
      			g.dispose();
      			newImage.getGraphics().drawImage( oldImage.getScaledInstance(186, 120, Image.SCALE_SMOOTH), 0, 0, null); 
      		     
      			
      			 ImageIO.write(newImage, "jpg" , new File(path + name));  
      		      System.out.println(name + path);
      		      newImage.flush();
      		      input.close();
      		     
      		} catch (IOException e) {
      			e.printStackTrace();
      		}
      			
          }
          /**
           * 模块：休闲娱乐 (856*286  ) 
           * @param FileItem数据源
           * @param 服务器绝对路径
           * @param 文件名
           */
           public void recreationAndEntertainment_856_286(FileItem f,String classpath,String filename){
           	InputStream input;
           	String name = filename;
           	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
                  
       		try {
       			input = f.getInputStream();
       			BufferedImage oldImage = ImageIO.read(input);
       		//	System.out.println(oldImage.getHeight());
       			BufferedImage newImage = new  BufferedImage(856,286,BufferedImage.TYPE_INT_RGB);
       			Graphics2D g = newImage.createGraphics();
       			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
       			g.dispose();
       			newImage.getGraphics().drawImage( oldImage.getScaledInstance(856, 286, Image.SCALE_SMOOTH), 0, 0, null); 
       		     
       			
       			 ImageIO.write(newImage, "jpg" , new File(path + name));  
       	//	      System.out.println(name + path);
       		      newImage.flush();
       		      input.close();
       		     
       		} catch (IOException e) {
       			e.printStackTrace();
       		}
       			
           }
           /**
            * 模块：休闲娱乐 (276*286  一张) 
            * @param FileItem数据源
            * @param 服务器绝对路径
            * @param 文件名
            */
            public void recreationAndEntertainment_276_286(FileItem f,String classpath,String filename){
            	InputStream input;
            	String name = filename;
            	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
                   
        		try {
        			input = f.getInputStream();
        			BufferedImage oldImage = ImageIO.read(input);
        		//	System.out.println(oldImage.getHeight());
        			BufferedImage newImage = new  BufferedImage(276,286,BufferedImage.TYPE_INT_RGB);
        			Graphics2D g = newImage.createGraphics();
        			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
        			g.dispose();
        			newImage.getGraphics().drawImage( oldImage.getScaledInstance(276, 286, Image.SCALE_SMOOTH), 0, 0, null); 
        		     
        			
        			 ImageIO.write(newImage, "jpg" , new File(path + name));  
        		//      System.out.println(name + path);
        		      newImage.flush();
        		      input.close();
        		     
        		} catch (IOException e) {
        			e.printStackTrace();
        		}
        			
            }
            /**
             * 模块：休闲娱乐 (292*135  两张) 
             * @param FileItem数据源
             * @param 服务器绝对路径
             * @param 文件名
             */
             public void recreationAndEntertainment_292_135(FileItem f,String classpath,String filename){
             	InputStream input;
             	String name = filename;
             	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
                    
         		try {
         			input = f.getInputStream();
         			BufferedImage oldImage = ImageIO.read(input);
         			System.out.println(oldImage.getHeight());
         			BufferedImage newImage = new  BufferedImage(292,135,BufferedImage.TYPE_INT_RGB);
         			Graphics2D g = newImage.createGraphics();
         			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
         			g.dispose();
         			newImage.getGraphics().drawImage( oldImage.getScaledInstance(292, 1, Image.SCALE_SMOOTH), 0, 0, null); 
         		     
         			
         			 ImageIO.write(newImage, "jpg" , new File(path + name));  
         		      System.out.println(name + path);
         		      newImage.flush();
         		      input.close();
         		     
         		} catch (IOException e) {
         			e.printStackTrace();
         		}
         			
             }
             /**
              * 模块：合作渠道 (200*70  两张) 
              * @param FileItem数据源
              * @param 服务器绝对路径
              * @param 文件名
              */
              public void Partner_200_70(FileItem f,String classpath,String filename){
              	InputStream input;
              	String name = filename;
              	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
                     
          		try {
          			input = f.getInputStream();
          			BufferedImage oldImage = ImageIO.read(input);
          		//	System.out.println(oldImage.getHeight());
          			BufferedImage newImage = new  BufferedImage(200,70,BufferedImage.TYPE_INT_RGB);
          			Graphics2D g = newImage.createGraphics();
          			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
          			g.dispose();
          			newImage.getGraphics().drawImage( oldImage.getScaledInstance(200, 70, Image.SCALE_SMOOTH), 0, 0, null); 
          		     
          			
          			 ImageIO.write(newImage, "jpg" , new File(path + name));  
          		 //     System.out.println(name + path);
          		      newImage.flush();
          		      input.close();
          		     
          		} catch (IOException e) {
          			e.printStackTrace();
          		}
          			
              }
              
              /**
               * 模块：轮播图 (1903*375  两张) 
               * @param FileItem数据源
               * @param 服务器绝对路径
               * @param 文件名
               */
               public void Carousel_1903_375(FileItem f,String classpath,String filename){
               	InputStream input;
               	String name = filename;
               	String path = classpath+Constant.image+Constant.news_info+Constant.news_theme;
                      
           		try {
           			input = f.getInputStream();
           			BufferedImage oldImage = ImageIO.read(input);
           		//	System.out.println(oldImage.getHeight());
           			BufferedImage newImage = new  BufferedImage(1903,375,BufferedImage.TYPE_INT_RGB);
           			Graphics2D g = newImage.createGraphics();
           			g.drawImage(oldImage, 0, 0, oldImage.getWidth(), oldImage.getHeight(), null);
           			g.dispose();
           			newImage.getGraphics().drawImage( oldImage.getScaledInstance(1903, 375, Image.SCALE_SMOOTH), 0, 0, null); 
           		     
           			
           			 ImageIO.write(newImage, "jpg" , new File(path + name));  
           		 //     System.out.println(name + path);
           		      newImage.flush();
           		      input.close();
           		     
           		} catch (IOException e) {
           			e.printStackTrace();
           		}
           			
               }
}


