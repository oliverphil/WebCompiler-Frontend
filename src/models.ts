export class CompilationResult {
  compileResult: string;
  errorLines: string[];
  timestamp: string;
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
  index?: number;
}

export class TestResults {
  compileErrors?: string[];
  testResults?: string[];
  timeout?: string;
}

export class UserInformation {
  id?: string;
  magic?: string;
  age: string;
  occupation: string;
  education: string;
  javaExperience: string;
  otherLanguages: string;
  ideExperience: string;
}

export class DeleteRequest {
  id: string;
}
