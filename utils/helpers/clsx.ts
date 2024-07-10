export default function clsx(...classes: any[]): string {
  return classes.filter(Boolean).join(" ");
}
