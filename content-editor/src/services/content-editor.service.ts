import { Injectable } from '@angular/core';
import {
  EditorElement,
  EditorElementData,
} from '../interfaces/content-editor.interface';
import { ImageInfo } from '@annuadvent/ngx-cms/cms-image-form';
import { SUPPORTED_TAGS } from '../constants/content-editor.constants';
import { SAMPLE_TABLE } from '../constants/table.constants';

@Injectable({
  providedIn: 'root',
})
export class ContentEditorService {
  constructor() {}

  private getEditorElementName(elType: string): string {
    return `${elType}-${Date.now()}`;
  }

  public initElementData(tagName: string, data: any = {}): EditorElementData {
    data = data || {};

    const elData: EditorElementData = {};
    switch (tagName) {
      case SUPPORTED_TAGS.IMAGE:
        const { src, alt } = data;
        elData.src = src || '';
        elData.alt = alt || '';
        break;
      case SUPPORTED_TAGS.CODE_BLOCK:
        const { source, language, enableEdit } = data;
        elData.source = source || '<h1>Sample source code</h1>';
        elData.language = language || 'markup';
        elData.enableEdit = enableEdit || false;
        break;
      case SUPPORTED_TAGS.TABLE:
        const { tableData } = data;
        elData.tableData = tableData || SAMPLE_TABLE;
        break;
      default:
        const { text } = data;
        elData.tableData = text || '';
    }

    return elData;
  }

  public findParent(el: EditorElement, parent: EditorElement): EditorElement {
    if (!parent.isContainer || !parent.children || !parent.children.length) {
      return null;
    }

    let foundParent: EditorElement;

    for (let i = 0; i < parent.children.length; i++) {
      const chEl = parent.children[i];

      if (el.name === chEl.name) {
        foundParent = parent;
        break;
      }

      foundParent = this.findParent(el, chEl);
      if (foundParent) {
        break;
      }
    }

    return foundParent;
  }

  /**
   * This function creates a new element based on existing element, and appends it to the parent of existing element.
   * @param existingEl  existing element, whose empty copy will be created as a new element.
   * @param fullTree
   */
  public addNewEditorElement(
    existingEl: EditorElement,
    fullTree: EditorElement
  ): void {
    const el = { ...existingEl };
    const parent = this.findParent(existingEl, fullTree);
    const index = parent.children.indexOf(existingEl);

    //Remove focus from all other elements of its parent
    parent.children.forEach((ch) => (ch.focused = false));

    // Prepare new element for adding it to parent, and addd focus to it.
    const newEl: EditorElement = {
      tagName: el.tagName,
      name: this.getEditorElementName(el.tagName),
      focused: true,
      data: this.initElementData(el.tagName), // Init with tagName specific empty or default data values
    };

    // Append newEl to its Parent (means parent's children)
    parent.children.splice(index + 1, 0, newEl);
  }

  public removeEditorElement(el: EditorElement, fullTree: EditorElement) {
    // if the element to remove is the only child of root, then do not remove
    if (fullTree.children.length === 1) {
      return;
    }

    // Find the parent of selected Element
    const parent = this.findParent(el, fullTree);
    if (!parent) {
      console.error('No Parent found or Element is Root element itself.');
      return;
    }
    const index = parent.children.indexOf(el);
    // remove selected child
    parent.children.splice(index, 1);

    if (parent.children.length) {
      const nextOrPreviousItemIndex =
        index >= parent.children.length ? index - 1 : index;
      const childToFocus = parent.children[nextOrPreviousItemIndex];
      if (
        childToFocus.isContainer &&
        childToFocus.children &&
        childToFocus.children.length
      ) {
        childToFocus.children[childToFocus.children.length - 1].focused = true;
      } else {
        childToFocus.focused = true;
      }
    } else {
      this.removeEditorElement(parent, fullTree);
    }
  }

  public setFocusOffAll(fullTree: EditorElement) {
    if (fullTree.focused) {
      fullTree.focused = false;
    }
    if (fullTree.children && fullTree.children.length) {
      fullTree.children.forEach((child) => this.setFocusOffAll(child));
    }
  }

  /**
   *
   * @param el Existing Element that will be replaced with new element
   * @param tagName New Element Tag Name
   * @param fullTree Root most Editor Element, means Root element having compltete tree.
   * @param data New item data
   */
  public replaceElement(
    el: EditorElement,
    tagName: string,
    fullTree: EditorElement,
    data: EditorElementData = null
  ) {
    /*
     * If existing focused element is LI of a UL/OL, check if new El is UL/OL, then do not replace el, but just change type of list to that of new el.
     * First Check if new El is an element that requires a parent, like li must have UL/OL as parent. Table-> TR- TD could be the other example. Then process them first
     */
    if (
      el.tagName ===
      SUPPORTED_TAGS.LIST_ITEM /*, el.tagName === otherElWithRequiredParent */
    ) {
      const parent = this.findParent(el, fullTree);

      // if new el is UL/OL, then change only el type to new El list type, else do nothing.
      if (
        [SUPPORTED_TAGS.ORDERED_LIST, SUPPORTED_TAGS.UNORDERED_LIST].includes(
          tagName as SUPPORTED_TAGS
        )
      ) {
        // if list type is different of existing list item, then change else do nothing
        if (parent.tagName !== tagName) {
          parent.name = this.getEditorElementName(tagName);
          parent.tagName = tagName;
        }
      } else {
        // If new el is not UL/OL, but any other and existing el is LI, then
        // remove existing LI and add copy as new item below the parent List (ul/ol)
        const newItem = { ...el };
        newItem.tagName = tagName;
        newItem.name = this.getEditorElementName(tagName);
        newItem.data = this.initElementData(tagName, data);

        // find parent of OL/UL of existing LI, so that new El cab be added to it
        const parentOfParent = this.findParent(parent, fullTree);
        let indexOfParent = parentOfParent.children.indexOf(parent);

        if (parent.children.length > 1) {
          indexOfParent++;
        }

        this.removeEditorElement(el, fullTree);
        this.setFocusOffAll(fullTree);

        // Add new el as sibling of existing UL/OL of existing LI
        parentOfParent.children.splice(indexOfParent, 0, newItem);
      }
    } else {
      // If new El is any other element than LI, then check if it is a direct Individual element or a container.

      // Check if new El is container Element, like UL/OL, then add relevant child/children before replacement process
      if (
        [SUPPORTED_TAGS.ORDERED_LIST, SUPPORTED_TAGS.UNORDERED_LIST].includes(
          tagName as SUPPORTED_TAGS
        )
      ) {
        // Create a new LI for the new List (UL/OL)
        const newListItem = { ...el };
        newListItem.tagName = SUPPORTED_TAGS.LIST_ITEM;
        newListItem.name = this.getEditorElementName(SUPPORTED_TAGS.LIST_ITEM);
        newListItem.data = this.initElementData(SUPPORTED_TAGS.LIST_ITEM, data);

        // Convert existing el to UL/OL, add above created li to it.
        el.tagName = tagName;
        el.name = this.getEditorElementName(tagName);
        el.isContainer = true;
        el.children = [newListItem];

        // As it's a container, so remove data and focus props from it.
        delete el.data;
        delete el.focused;
      } else {
        el.tagName = tagName;
        el.name = this.getEditorElementName(tagName);
        if (data) el.data = this.initElementData(tagName, data);
      }
    }
  }
}
