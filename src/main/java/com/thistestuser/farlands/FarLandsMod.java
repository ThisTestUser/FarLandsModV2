package com.thistestuser.farlands;

import net.minecraftforge.fml.common.Mod;

@Mod(value = FarLandsMod.MODID)
public class FarLandsMod
{
	public static final String MODID = "farlandsmod";
	
	public FarLandsMod()
	{
		Config.setup();
	}
}
