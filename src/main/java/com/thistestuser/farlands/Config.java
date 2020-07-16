package com.thistestuser.farlands;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import net.minecraft.util.math.MathHelper;

public class Config
{
	/**
	 * Should we re-enable the far lands?
	 */
	private boolean isFarLands = true;
	
	/**
	 * Should we extend the world border?
	 */
	private boolean extendWB = true;
	
	/**
	 * Should we offset the terrain? If we should, then offsetX and offsetZ will be used.
	 */
	private boolean offset = false;
	
	private int offsetX = 0;
	private int offsetZ = 0;
	
	/**
	 * The location of the config file. It is currently located at %mc_dir%/config/farlandsmod.cfg.
	 */
	private static final File config = new File("config/farlandsmod.cfg");
	private static final Logger LOGGER = LogManager.getLogger();
	private static Config instance;
	
	public static void setup()
	{
		instance = new Config();
		instance.loadConfig();
	}
	
	/**
	 * Loads the config.
	 */
	private void loadConfig()
	{
		try
		{
			if(!config.exists())
			{
				config.getParentFile().mkdirs();
				config.createNewFile();
				writeConfig();
				return;
			}
			 BufferedReader reader = new BufferedReader(new FileReader(config));
			 String s;
			 while((s = reader.readLine()) != null)
			 {
				 String[] args = s.split(":");
				 if(args[0].equalsIgnoreCase("farlands"))
					 isFarLands = args.length == 1 ? true : args[1].equalsIgnoreCase("true");
				 else if(args[0].equalsIgnoreCase("extendwb"))
					 extendWB = args.length == 1 ? true : args[1].equalsIgnoreCase("true");
				 else if(args[0].equalsIgnoreCase("offset"))
					 offset = args.length == 1 ? false : args[1].equalsIgnoreCase("true");
				 else if(args[0].equalsIgnoreCase("offsetX"))
					 offsetX = args.length == 1 ? 0 : parseInt(args[1], "offsetX");
				 else if(args[0].equalsIgnoreCase("offsetZ"))
					 offsetZ = args.length == 1 ? 0 : parseInt(args[1], "offsetZ");
			 }
			 reader.close();
		}catch(Exception e)
		{
			LOGGER.error("[FarLands]: An error occured while trying to load config!");
			e.printStackTrace();
		}
	}
	
	/**
	 * Uses PrintWriter to write the config.
	 */
	private void writeConfig()
	{
		try
		{
			PrintWriter writer = new PrintWriter(new FileWriter(config));	
			writer.println("#Visit https://github.com/ThisTestUser/FarLandsModV2/ for the source code");
			writer.println("#Should we bring back the far lands?");
			writer.println("farlands:" + isFarLands);
			writer.println("#Should we extend the world border?");
			writer.println("extendwb:" + extendWB);
			writer.println("#Should we offset the terrain?");
			writer.println("#offestX and offsetZ will not do anything if this is false");
			writer.println("#Terrain features will have some differences when compared to the original terrain");
			writer.println("offset:" + offset);
			writer.println("#Note: The offsets are written in chunk coordinates, so please divide the value you want by 16!");
			writer.println("#Example: If offsetX and offsetZ are both set to 100, the center of the map will generate terrain at 1600,1600.");
			writer.println("#Do not put values outside of the integer limit (-2147483648 to 2147483647)!");
			writer.println("offsetX:" + offsetX);
			writer.println("offsetZ:" + offsetZ);
			writer.close();
		}catch(Exception e)
		{
			LOGGER.error("[FarLands]: An error occured while trying to write config!");
			e.printStackTrace();
		}
	}
	
	private int parseInt(String s, String name)
	{
		try
		{
			return Integer.parseInt(s);
		}catch(NumberFormatException e)
		{
			LOGGER.error("[FarLands]: Invaild offset for " + name);
			return 0;
		}
	}

	public static double maintainPrecision(double d)
	{
		return instance.isFarLands ? d : d - (double)MathHelper.lfloor(d / 3.3554432E7D + 0.5D) * 3.3554432E7D;
	}
	
	public static double adjust6E7D()
	{
		return instance.extendWB ? 4294967294D : 6.0E7D;
	}
	
	public static float adjust6E7F()
	{
		return instance.extendWB ? 4294967294F : 6.0E7F;
	}
	
	public static int adjust2984()
	{
		return instance.extendWB ? Integer.MAX_VALUE : 29999984;
	}
	
	public static double adjust3E7D()
	{
		return instance.extendWB ? 2147483647D : 3E7D;
	}
	
	public static double adjustN3E7D()
	{
		return instance.extendWB ? -2147483648D : -3E7D;
	}
	
	public static int adjust3E7I()
	{
		return instance.extendWB ? Integer.MAX_VALUE : 30000000;
	}
	
	public static int adjustN3E7I()
	{
		return instance.extendWB ? Integer.MIN_VALUE : -30000000;
	}
	
	public static int adjust2E7I()
	{
		return instance.extendWB ? Integer.MAX_VALUE : 20000000;
	}
	
	public static int adjustN2E7I()
	{
		return instance.extendWB ? Integer.MIN_VALUE : -20000000;
	}
	
	public static double adjust29872D()
	{
		return instance.extendWB ? 2147483647D : 2.9999872E7D;
	}
	
	public static double adjust29D()
	{
		return instance.extendWB ? 2147483647D : 29999999D;
	}
	
	public static double adjustN29D()
	{
		return instance.extendWB ? -2147483648D : -29999999D;
	}
	
	public static int adjust29I()
	{
		return instance.extendWB ? Integer.MAX_VALUE : 29999999;
	}
	
	public static int getOffsetXM()
	{
		return instance.offset ? instance.offsetX * 16 : 0;
	}
	
	public static int getOffsetZM()
	{
		return instance.offset ? instance.offsetZ * 16 : 0;
	}
	
	public static int getOffsetXM4()
	{
		return instance.offset ? instance.offsetX * 4: 0;
	}
	
	public static int getOffsetZM4()
	{
		return instance.offset ? instance.offsetZ * 4: 0;
	}
	
	public static int getOffsetX()
	{
		return instance.offset ? instance.offsetX : 0;
	}
	
	public static int getOffsetZ()
	{
		return instance.offset ? instance.offsetZ : 0;
	}
}
