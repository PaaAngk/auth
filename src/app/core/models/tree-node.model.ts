export interface TreeNode {
    readonly text: string;
    readonly category: string;
    readonly children?: readonly TreeNode[];
}