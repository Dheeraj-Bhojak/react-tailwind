declare module "wowjs" {
  export class WOW {
    sync() {
      throw new Error("Method not implemented.");
    }
    constructor(options?: {
      boxClass?: string;
      animateClass?: string;
      offset?: number;
      mobile?: boolean;
      live?: boolean;
    });

    init(): void;
  }
}
