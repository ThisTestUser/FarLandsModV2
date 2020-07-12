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
	ILOAD = Opcodes.ILOAD;
	ISTORE = Opcodes.ISTORE;
	IADD = Opcodes.IADD;
	ISUB = Opcodes.ISUB;
	ISHL = Opcodes.ISHL;

	return {
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
		"WBCommand": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.command.impl.WorldBorderCommand",
			},
			"transformer": function(classNode) {
				var double_ldc = new LdcInsnNode(0.5);
				var integer_ldc = new LdcInsnNode(123);
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == double_ldc.cst.getClass() &&
							instruction.cst == 60000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust6E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						} else if (instruction.getOpcode() == LDC && instruction.cst.getClass() != integer_ldc.cst.getClass() &&
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
		"WorldBorder": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.border.WorldBorder",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == 60000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust6E7D", "()D", false);
							methodNode.instructions.set(instruction, replace);
						}else if (instruction.getOpcode() == LDC && instruction.cst == 29999984) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust2984", "()I", false);
							methodNode.instructions.set(instruction, replace);
						}
					}
				});
				return classNode;
			}
		},
		"WorldInfo": {
			"target": {
				"type": "CLASS",
				"name": "net.minecraft.world.storage.WorldInfo",
			},
			"transformer": function(classNode) {
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst == 60000000) {
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
				"name": "net.minecraft.entity.Entity",
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
						}
					}
				});
				return classNode;
			}
		},
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
						if (instruction.getOpcode() == LDC && instruction.cst == 30000000) {
							var replace = new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
								"adjust3E7D", "()D", false);
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
				"name": "net.minecraft.world.IWorldReader",
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
				"name": "net.minecraft.world.World",
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
				"name": "net.minecraft.entity.player.PlayerEntity",
			},
			"transformer": function(classNode) {
				var double_ldc = new LdcInsnNode(0.5);
				var integer_ldc = new LdcInsnNode(123);
				classNode.methods.forEach(function(methodNode) {
					var arrayLength = methodNode.instructions.size();
					for (var i = 0; i < arrayLength; i++) {
						var instruction = methodNode.instructions.get(i);
						if (instruction.getOpcode() == LDC && instruction.cst.getClass() == double_ldc.cst.getClass() &&
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
						if (instruction.getOpcode() == LDC && instruction.cst == 29999872) {
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
						list.add(new VarInsnNode(ISTORE, 3));
						list.add(new VarInsnNode(ILOAD, 4));
						list.add(new MethodInsnNode(INVOKESTATIC, "com/thistestuser/farlands/Config",
							"getOffsetZM", "()I", false));
						list.add(new InsnNode(IADD));
						list.add(new VarInsnNode(ISTORE, 4));
						methodNode.instructions.insertBefore(methodNode.instructions.getFirst(), list);
					} else if (methodNode.name.equals(ASMAPI.mapMethod("func_202425_c")) ||
						methodNode.name.equals(ASMAPI.mapMethod("func_202427_a"))) {
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
					}
				});
				return classNode;
			}
		},
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
		"MakeBase": {
			"target": {
				"type": "METHOD",
				"class": "net.minecraft.world.gen.NoiseChunkGenerator",
				"methodName": "func_222537_b",
				"methodDesc": "(Lnet/minecraft/world/IWorld;Lnet/minecraft/world/chunk/IChunk;)V",
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
