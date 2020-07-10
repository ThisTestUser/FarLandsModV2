function initializeCoreMod() {
    Opcodes = Java.type("org.objectweb.asm.Opcodes");
	InsnList = Java.type("org.objectweb.asm.tree.InsnList");
	MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

    LDC = Opcodes.LDC;
	INVOKESTATIC = Opcodes.INVOKESTATIC;

    return {
        //1.13
        "OldNoiseOcto": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.gen.NoiseGeneratorOctaves",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                    if (methodNode.desc === "([DIIIIIIDDD)[D") {
						var pass = false;
                        var arrayLength = methodNode.instructions.size();
                        for (var i = 0; i < arrayLength; i++) {
                            var instruction = methodNode.instructions.get(i);
                            if (instruction.getOpcode() == LDC && instruction.cst == 16777216) {
                            	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                            		"getModulo", "()J", false);
                                methodNode.instructions.set(instruction, replace);
								pass = true;
                            }
                        }
						if (pass)
							print("[FarLands] Noise generator hooked succesfully!");
                    }
                });
                return classNode;
            }
        },
		//1.14+ (part 1)
		"NewNoiseOcto": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.gen.NoiseChunkGenerator",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                    if (methodNode.desc === "(IIIDDDD)D") {
						var pass = false;
                        var arrayLength = methodNode.instructions.size();
                        for (var i = 0; i < arrayLength; i++) {
                            var instruction = methodNode.instructions.get(i);
                            if (instruction.getOpcode() == INVOKESTATIC
								&& instruction.owner.equals("net/minecraft/world/gen/OctavesNoiseGenerator")
								&& instruction.desc.equals("(D)D")) {
                           		instruction.owner = "com/thistestuser/farlands/Config";
								instruction.name = "maintainPrecision";
								pass = true;
                            }
                        }
						if (pass)
							print("[FarLands] Noise generator hooked succesfully (Part 1)!");
                    }
                });
                return classNode;
            }
        },
		//1.14+ (part 2)
		"NewNoiseOcto2": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.gen.OctavesNoiseGenerator",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                    if (methodNode.desc === "(DDDDDZ)D") {
						var pass = false;
                        var arrayLength = methodNode.instructions.size();
                        for (var i = 0; i < arrayLength; i++) {
                            var instruction = methodNode.instructions.get(i);
                            if (instruction.getOpcode() == INVOKESTATIC
								&& instruction.owner.equals("net/minecraft/world/gen/OctavesNoiseGenerator")
								&& instruction.desc.equals("(D)D")) {
                           		instruction.owner = "com/thistestuser/farlands/Config";
								instruction.name = "maintainPrecision";
								pass = true;
                            }
                        }
						if (pass)
							print("[FarLands] Noise generator hooked succesfully (Part 2)!");
                    }
                });
                return classNode;
            }
        },
		"WB1": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.command.impl.WorldBorderCommand",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 60000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust6E7D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Float"
                        	&& instruction.cst == 60000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust6E7F", "()F", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "WB2": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.border.WorldBorder",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 60000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust6E7D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "WB3": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.storage.WorldInfo",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 60000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust6E7D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 29999984) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust2984", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "WB3": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.storage.WorldInfo",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 60000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust6E7D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "ServerProp": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.server.dedicated.ServerProperties",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 29999984) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust2984", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "Server": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.server.MinecraftServer",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 29999984) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust2984", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "Entity": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.entity.Entity",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == -30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjustN3E7D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 29999872) {
                        	//1.13
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust29872I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 29999872) {
                        	//1.14+
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust29872D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.13
        "NetHandlerPlayServer": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.network.NetHandlerPlayServer",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.14+
        "ServerPlayNetHandler": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.network.play.ServerPlayNetHandler",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.13
        "RenderChunkCache": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.client.renderer.chunk.RenderChunkCache",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == -30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjustN3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.13
        "IWorldReaderBase": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.IWorldReaderBase",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == -30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjustN3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.13
        "Region": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.Region",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == -30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjustN3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.14+
        "IWorldReader": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.IWorldReader",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == -30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjustN3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "BlockPos": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.util.math.BlockPos",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == -30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjustN3E7D", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7D", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "World": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.world.World",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == -30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjustN3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        "ForceLoadCommand": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.command.impl.ForceLoadCommand",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == -30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjustN3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 30000000) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust3E7I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.13
        "EntityPlayer": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.entity.player.EntityPlayer",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 29999999) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust29D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 29999999) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust29I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.14+
        "PlayerEntity": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.entity.player.PlayerEntity",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 29999999) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust29D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 29999999) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust29I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.13
        "PlayerList": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.server.management.PlayerList",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer"
                        	&& instruction.cst == 29999872) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust29872I", "()I", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        },
        //1.14+
        "ServerPlayerEntity": {
            "target": {
                "type": "CLASS",
                "name": "net.minecraft.entity.player.ServerPlayerEntity",
            },
            "transformer": function(classNode) {
                classNode.methods.forEach(function(methodNode) {
                	var arrayLength = methodNode.instructions.size();
                    for (var i = 0; i < arrayLength; i++) {
                    	var instruction = methodNode.instructions.get(i);
                        if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double"
                        	&& instruction.cst == 29999872) {
                        	var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
                        		"adjust29872D", "()D", false);
                        	methodNode.instructions.set(instruction, replace);
                        }
                    }
                });
                return classNode;
            }
        }
    };
}