export class CompilationResult {
  compileResult: string;
  errorLines: string[];
}

export class Decoration {
  lineNumber: number;
  className: string;
}

export class ChallengeInstruction {
  instructions: string;
  starterCode: string;
  challengeName: string;
  userCode?: string;
  complete?: boolean;
}

export class TestResults {
  compileErrors?: string[];
  testResults?: string[];
}
