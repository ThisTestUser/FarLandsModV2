function initializeCoreMod() {
	Opcodes = Java.type("org.objectweb.asm.Opcodes");
	InsnList = Java.type("org.objectweb.asm.tree.InsnList");
	MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
	InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
	VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");
	ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");

	LDC = Opcodes.LDC;
	INVOKESTATIC = Opcodes.INVOKESTATIC;
	INVOKEVIRTUAL = Opcodes.INVOKEVIRTUAL;
	GETFIELD = Opcodes.GETFIELD;
	ILOAD = Opcodes.ILOAD;
	ISTORE = Opcodes.ISTORE;
	IADD = Opcodes.IADD;
	ISUB = Opcodes.ISUB;

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
							if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Long" &&
								instruction.cst == 16777216) {
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
							if (instruction.getOpcode() == INVOKESTATIC &&
								instruction.owner.equals("net/minecraft/world/gen/OctavesNoiseGenerator") &&
								instruction.desc.equals("(D)D")) {
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
							if (instruction.getOpcode() == INVOKESTATIC &&
								instruction.owner.equals("net/minecraft/world/gen/OctavesNoiseGenerator") &&
								instruction.desc.equals("(D)D")) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 60000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust6E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Float" &&
							instruction.cst == 60000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 60000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 60000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust6E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 29999984) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 60000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 29999984) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 29999984) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust3E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 29999872) {
							//1.13
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust29872I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 29999872) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 30000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 30000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 30000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 30000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 30000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust3E7I", "()I", false);
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 30000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 30000000) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 29999999) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust29D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 29999999) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 29999999) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust29D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 29999999) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Integer" &&
							instruction.cst == 29999872) {
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
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == "class java.lang.Double" &&
							instruction.cst == 29999872) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust29872D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						}
					}
				});
				return classNode;
			}
		},
		"SharedSeedRandom": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.util.SharedSeedRandom",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					if (methodNode.name.equals(ASMAPI.mapMethod("func_202424_a"))) {
						var list = new InsnList();
						list.add(new VarInsnNode(ILOAD, 3));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetXM", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 4));
						list.add(new VarInsnNode(ILOAD, 3));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetZM", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 4));
						methodNode.instructions.insertBefore(methodNode.instructions.getFirst(), list);
					} else if (methodNode.name.equals(ASMAPI.mapMethod("func_202426_b")) || methodNode.name.equals(ASMAPI.mapMethod("func_202425_c")) ||
						methodNode.name.equals(ASMAPI.mapMethod("func_202427_a"))) {
						var list = new InsnList();
						list.add(new VarInsnNode(ILOAD, 3));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetX", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 4));
						list.add(new VarInsnNode(ILOAD, 3));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetZ", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 4));
						methodNode.instructions.insertBefore(methodNode.instructions.getFirst(), list);
					}
				});
				return classNode;
			}
		},
		//1.13
		"AbstractChunkGenerator": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.gen.AbstractChunkGenerator",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					offsetChunkPos(methodNode);
				});
				return classNode;
			}
		},
		//1.13
		"SetBlocksInChunk": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.gen.ChunkGeneratorOverworld",
				"methodName": "func_185976_a",
				"methodDesc": "(IILnet/minecraft/world/chunk/IChunk;)V",
			},
			"transformer": function(methodNode) {
				offsetChunkPos(methodNode);
				return methodNode;
			}
		},
		//1.13
		"MakeBaseOld": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.gen.ChunkGeneratorOverworld",
				"methodName": "func_202088_a",
				"methodDesc": "(Lnet/minecraft/world/chunk/IChunk;)V",
			},
			"transformer": function(methodNode) {
				offsetChunkPos(methodNode);
				return methodNode;
			}
		},
		//1.13
		"ChunkGeneratorNether": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.gen.ChunkGeneratorNether",
				"methodName": "func_202088_a",
				"methodDesc": "(Lnet/minecraft/world/chunk/IChunk;)V",
			},
			"transformer": function(methodNode) {
				offsetChunkPos(methodNode);
				return methodNode;
			}
		},
		//1.13
		"ChunkGeneratorEnd": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.gen.ChunkGeneratorEnd",
				"methodName": "func_202088_a",
				"methodDesc": "(Lnet/minecraft/world/chunk/IChunk;)V",
			},
			"transformer": function(methodNode) {
				offsetChunkPos(methodNode);
				return methodNode;
			}
		},
		//1.14+
		"GenerateSurface": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.gen.NoiseChunkGenerator",
				"methodName": "func_225551_a_",
				"methodDesc": "(Lnet/minecraft/world/gen/WorldGenRegion;Lnet/minecraft/world/chunk/IChunk;)V",
			},
			"transformer": function(methodNode) {
				var arrayLength = methodNode.instructions.size();
				var foundX = false;
				var foundZ = false;
				for (var i = 0; i < arrayLength; i++) {
					var instruction = methodNode.instructions.get(i);
					if (!foundX && instruction.getOpcode() == GETFIELD && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapField("field_77276_a"))) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetX", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
						foundX = true;
					} else if (!foundZ && instruction.getOpcode() == GETFIELD && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapField("field_77275_b"))) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetZ", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
						foundZ = true;
					} else if (instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapMethod("func_180334_c"))) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetXM", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
					} else if (instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapMethod("func_180333_d"))) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetZM", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
					}
				}
				return methodNode;
			}
		},
		//1.14+
		"MakeBase": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.gen.NoiseChunkGenerator",
				"methodName": "func_222537_b",
				"methodDesc": "(Lnet/minecraft/world/chunk/IChunk;)V",
			},
			"transformer": function(methodNode) {
				offsetChunkPos(methodNode);
				return methodNode;
			}
		},
		//1.15+ (not needed for 1.14)
		"BiomeContainer": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.biome.BiomeContainer",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					var foundX = false;
					var foundZ = false;
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (!foundX && instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
							instruction.name.equals(ASMAPI.mapMethod("func_180334_c"))) {
							var list = new InsnList();
							list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetXM", "()I", false));
							list.add(new InsnNode(IADD));
							methodNode.instructions.insert(instruction, list);
							foundX = true;
						} else if (!foundZ && instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
							instruction.name.equals(ASMAPI.mapMethod("func_180333_d"))) {
							var list = new InsnList();
							list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetZM", "()I", false));
							list.add(new InsnNode(IADD));
							methodNode.instructions.insert(instruction, list);
							foundZ = true;
						}
					}
				});
				return classNode;
			}
		}
	};
}

function offsetChunkPos(methodNode) {
	var arrayLength = methodNode.instructions.size();
	for (var i = 0; i < arrayLength; i++) {
		var instruction = methodNode.instructions.get(i);
		if (instruction.getOpcode() == GETFIELD && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
			instruction.name.equals(ASMAPI.mapField("field_77276_a"))) {
			var list = new InsnList();
			list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetX", "()I", false));
			list.add(new InsnNode(IADD));
			methodNode.instructions.insert(instruction, list);
		} else if (instruction.getOpcode() == GETFIELD && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
			instruction.name.equals(ASMAPI.mapField("field_77275_b"))) {
			var list = new InsnList();
			list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetZ", "()I", false));
			list.add(new InsnNode(IADD));
			methodNode.instructions.insert(instruction, list);
		}
	}
}
