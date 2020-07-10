function initializeCoreMod() {
    Opcodes = Java.type("org.objectweb.asm.Opcodes");
	InsnList = Java.type("org.objectweb.asm.tree.InsnList");

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
                                instruction.cst = 9223372036854775808;
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
		//1.14 (part 1)
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
		//1.14 (part 2)
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
        }
    };
}