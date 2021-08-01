function initializeCoreMod() {
	Opcodes = Java.type("org.objectweb.asm.Opcodes");
	InsnList = Java.type("org.objectweb.asm.tree.InsnList");
	MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
	InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
	VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");
	LdcInsnNode = Java.type("org.objectweb.asm.tree.LdcInsnNode");
	ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");

	LDC = Opcodes.LDC;
	INVOKESTATIC = Opcodes.INVOKESTATIC;
	INVOKEVIRTUAL = Opcodes.INVOKEVIRTUAL;
	GETFIELD = Opcodes.GETFIELD;
	ALOAD = Opcodes.ALOAD;
	ILOAD = Opcodes.ILOAD;
	ISTORE = Opcodes.ISTORE;
	IADD = Opcodes.IADD;
	ISUB = Opcodes.ISUB;
	ISHL = Opcodes.ISHL;

	return {
		"NewNoiseOcto": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.level.levelgen.synth.BlendedNoise",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					if (methodNode.desc === "(DDDDDZ)D") {
						var pass = false;
						var arrayLength = methodNode.instructions.size();
						for (var i = 0; i < arrayLength; i++) {
							var instruction = methodNode.instructions.get(i);
							if (instruction.getOpcode() == INVOKESTATIC &&
								instruction.owner.equals("net/minecraft/world/level/levelgen/synth/PerlinNoise") &&
								instruction.desc.equals("(D)D")) {
								instruction.owner = "com/thistestuser/farlands/Config";
								instruction.name = "wrap";
								pass = true;
							}
						}
						if (pass)
							print("[FarLands] Noise generator hooked succesfully (1.17+)!");
					}
				});
				return classNode;
			}
		},
		"WBCommand": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.server.commands.WorldBorderCommand",
			},
			"transformer": function(classNode) {
				var double_ldc = new LdcInsnNode(0.5);
				var integer_ldc = new LdcInsnNode(123);
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == double_ldc.cst.getClass() &&
							instruction.cst == 59999968) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust5968D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == double_ldc.cst.getClass() &&
							instruction.cst == -59999968) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN5968D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						}
					}
				});
				return classNode;
			}
		},
		"WorldBorder": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.level.border.WorldBorder",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == 59999968) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust5968D", "()D", false);
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
				"name": "net.minecraft.server.dedicated.DedicatedServerProperties",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == 29999984) {
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
				"name": "net.minecraft.world.entity.Entity",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == 30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust3E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == 29999872) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust29872D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == -29999872) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN29872D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						}
					}
				});
				return classNode;
			}
		},
		"ServerPlayNetHandler": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.server.network.ServerGamePacketListenerImpl",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == 30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust3E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == 20000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust2E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == -20000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN2E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						}
					}
				});
				return classNode;
			}
		},
		"IWorldReader": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.level.LevelReader",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == 30000000) {
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
				"name": "net.minecraft.level.Level",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == 30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						}else if (instruction.getOpcode() == LDC && instruction.cst == -20000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN2E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == 20000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust2E7I", "()I", false);
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
				"name": "net.minecraft.server.commands.ForceLoadCommand",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == -30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst == 30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust3E7I", "()I", false);
							methodNode.instructions.set(instruction, replace);
						}
					}
				});
				return classNode;
			}
		},
		"PlayerEntity": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.entity.player.Player",
			},
			"transformer": function(classNode) {
				var double_ldc = new LdcInsnNode(0.5);
				var integer_ldc = new LdcInsnNode(123);
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == double_ldc.cst.getClass() &&
							instruction.cst == -29999999) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjustN29D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						}else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == double_ldc.cst.getClass() &&
							instruction.cst == 29999999) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust29D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() == integer_ldc.cst.getClass() &&
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
		"SharedSeedRandom": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.level.levelgen.WorldgenRandom",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					if (methodNode.name.equals(ASMAPI.mapMethod("m_64690_"))) {
						var list = new InsnList();
						list.add(new VarInsnNode(ILOAD, 3));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetXM", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 3));
						list.add(new VarInsnNode(ILOAD, 4));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetZM", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 4));
						methodNode.instructions.insertBefore(methodNode.instructions.getFirst(), list);
					} else if (methodNode.name.equals(ASMAPI.mapMethod("m_64703_")) ||
						methodNode.name.equals(ASMAPI.mapMethod("m_64694_"))) {
						var list = new InsnList();
						list.add(new VarInsnNode(ILOAD, 3));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetX", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 3));
						list.add(new VarInsnNode(ILOAD, 4));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetZ", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 4));
						methodNode.instructions.insertBefore(methodNode.instructions.getFirst(), list);
					} else if (methodNode.name.equals(ASMAPI.mapMethod("m_158961_")))) {
						var list = new InsnList();
						list.add(new VarInsnNode(ILOAD, 3));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetXM", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 3));
						list.add(new VarInsnNode(ILOAD, 5));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetZM", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 5));
						methodNode.instructions.insertBefore(methodNode.instructions.getFirst(), list);
					}
				});
				return classNode;
			}
		},
		"GenerateSurface": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.level.levelgen.NoiseBasedChunkGenerator",
				"methodName": "m_7338_",
				"methodDesc": "(Lnet/minecraft/server/level/WorldGenRegion;Lnet/minecraft/world/level/chunk/ChunkAccess;)V",
			},
			"transformer": function(methodNode) {
				var arrayLength = methodNode.instructions.size();
				var foundX = false;
				var foundZ = false;
				for (var i = 0; i < arrayLength; i++) {
					var instruction = methodNode.instructions.get(i);
					if (!foundX && instruction.getOpcode() == GETFIELD && instruction.owner.equals("net/minecraft/world/level/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapField("f_45578_"))) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetX", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
						foundX = true;
					} else if (!foundZ && instruction.getOpcode() == GETFIELD && instruction.owner.equals("net/minecraft/world/level/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapField("f_45579_"))) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetZ", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
						foundZ = true;
					} else if (instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/world/level/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapMethod("m_45604_"))) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetXM", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
					} else if (instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/world/level/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapMethod("m_45605_"))) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetZM", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
					}
				}
				return methodNode;
			}
		},
		"DoFill": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.level.levelgen.NoiseBasedChunkGenerator",
				"methodName": "m_158427_",
				"methodDesc": "(Lnet/minecraft/world/IWorld;Lnet/minecraft/world/gen/feature/structure/StructureManager;Lnet/minecraft/world/chunk/IChunk;)V",
			},
			"transformer": function(methodNode) {
				var arrayLength = methodNode.instructions.size();
				var xLoc = -1;
				var zLoc = -1;
				var shiftCount = 0;
				for (var i = 0; i < arrayLength; i++) {
					var instruction = methodNode.instructions.get(i);
					if (instruction.getOpcode() == GETFIELD && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapField("field_77276_a"))) {
						xLoc = instruction.getNext().var;
					} else if (instruction.getOpcode() == GETFIELD && instruction.owner.equals("net/minecraft/util/math/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapField("field_77275_b"))) {
						zLoc = instruction.getNext().var;
					} else if (instruction.getOpcode() == ISHL && xLoc != -1 && zLoc != -1) {
						shiftCount++;
						if(shiftCount > 1) {
							var list = new InsnList();
							list.add(new VarInsnNode(ILOAD, xLoc));
							list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"getOffsetX", "()I", false));
							list.add(new InsnNode(IADD));
							list.add(new VarInsnNode(ISTORE, xLoc));
							list.add(new VarInsnNode(ILOAD, zLoc));
							list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"getOffsetZ", "()I", false));
							list.add(new InsnNode(IADD));
							list.add(new VarInsnNode(ISTORE, zLoc));
							methodNode.instructions.insert(instruction, list);
							break;
						}
					}
				}
				return methodNode;
			}
		},
		"BiomeContainer": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.level.chunk.ChunkBiomeContainer",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					var foundX = false;
					var foundZ = false;
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (!foundX && instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/world/level/ChunkPos") &&
							instruction.name.equals(ASMAPI.mapMethod("m_45604_"))) {
							var list = new InsnList();
							list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetXM", "()I", false));
							list.add(new InsnNode(IADD));
							methodNode.instructions.insert(instruction, list);
							foundX = true;
						} else if (!foundZ && instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/world/level/ChunkPos") &&
							instruction.name.equals(ASMAPI.mapMethod("m_45605_"))) {
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
		},
		"ChunkGenerator": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.level.chunk.ChunkGenerator",
				"methodName": "m_7399_",
				"methodDesc": "(Lnet/minecraft/server/level/WorldGenRegion;Lnet/minecraft/world/level/StructureFeatureManager;)V",
			},
			"transformer": function(methodNode) {
				var arrayLength = methodNode.instructions.size();
				var xLoc = -1;
				var zLoc = -1;
				var patchedX = false;
				var patchedZ = false;
				for (var i = 0; i < arrayLength; i++) {
					var instruction = methodNode.instructions.get(i);
					if (instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/world/level/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapMethod("m_45604_"))) {
						xLoc = instruction.getNext().var;
					} else if (instruction.getOpcode() == INVOKEVIRTUAL && instruction.owner.equals("net/minecraft/world/level/ChunkPos") &&
						instruction.name.equals(ASMAPI.mapMethod("m_45605_"))) {
						zLoc = instruction.getNext().var;
					} else if (!patchedX && instruction.getOpcode() == ALOAD && xLoc == instruction.var) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetXM", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
						foundX = true;
					} else if (!patchedZ && instruction.getOpcode() == ALOAD && zLoc == instruction.var) {
						var list = new InsnList();
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config", "getOffsetZM", "()I", false));
						list.add(new InsnNode(IADD));
						methodNode.instructions.insert(instruction, list);
						foundZ = true;
					}
				}
				return methodNode;
			}
		}
	};
}
