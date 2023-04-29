import { subscribePrimitive } from "@store";
import { generateTagPicker } from "./generateTagPicker";
import { __zeroMatch } from "./noMatch";
import { initializeTagFilter, renderTagList, renderTag_BLUE } from "./tagPicker";

export { generateTagPicker, __zeroMatch, renderTagList, renderTag_BLUE, initializeTagFilter };

subscribePrimitive("tagFilter", renderTagList);
