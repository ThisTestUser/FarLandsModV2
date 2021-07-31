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
		}
	};
}
}
