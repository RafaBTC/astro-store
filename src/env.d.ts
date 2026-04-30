declare namespace App {
  interface Locals {
    user: import('./types/Auth').User | null
  }
}
