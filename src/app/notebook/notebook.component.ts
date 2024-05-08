import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-notebook-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './notebook.component.html',
  styleUrl: './notebook.component.css',
})
export class NotebookTaskComponent {
  note = {
    title: '',
    content: '',
  };

  title = new FormControl('', [Validators.required, Validators.minLength(5)]);
  content = new FormControl('', [Validators.required, Validators.minLength(7)]);

  notes: { title: string; content: string }[] = [];

  selectedNoteIndex: number | null = null;

  saveNote() {
    if (this.title.valid && this.content.valid) {
        if (this.selectedNoteIndex !== null) {
          this.notes[this.selectedNoteIndex].title = this.title.value!;
          this.notes[this.selectedNoteIndex].content = this.content.value!;
          
          this.selectedNoteIndex = null;
          this.title.reset();
          this.content.reset();
        } else {
          
          this.notes.push({
            title: this.title.value!,
            content: this.content.value!,
          });
          this.title.reset();
          this.content.reset();
        }
    }
  }

  selectNote(index: number) {
    this.selectedNoteIndex = index;
    this.note = { ...this.notes[index] };
  }

  editNote(index: number) {
    this.title.setValue(this.notes[index].title);
    this.content.setValue(this.notes[index].content);
  }

  deleteNote() {
    if (this.selectedNoteIndex !== null) {
      this.notes.splice(this.selectedNoteIndex, 1);
      this.note = { title: '', content: '' };
      this.selectedNoteIndex = null;
    }
  }
}