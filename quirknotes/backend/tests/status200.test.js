test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });


const SERVER_URL = "http://localhost:4000";


test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
});


test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response).toStrictEqual([]);
});


test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  const notes = [
    { title: "NoteTitleTest1", content: "NoteTitleContent1" },
    { title: "NoteTitleTest2", content: "NoteTitleContent2" }
  ];

  for (const note of notes) {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
  }

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(Array.isArray(getAllNotesBody.response)).toBe(true);
  expect(getAllNotesBody.response.length).toBe(2);

  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
});


test("/deleteNote - Delete a note", async () => {
  const title = "NoteTitleTest3";
  const content = "NoteContentTest3";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  const noteId = postNoteBody.insertedId;
  
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});


test("/patchNote - Patch with content and title", async () => {
  const title = "NoteTitleTest4";
  const content = "NoteContentTest4";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch (`${SERVER_URL}/patchNote/${noteId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "NoteTitleTest4-1",
      content: "NoteContentTest4-1",
    }),
  });

  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});


test("/patchNote - Patch with just title", async () => {
  const title = "NoteTitleTest5";
  const content = "NoteContentTest5";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch (`${SERVER_URL}/patchNote/${noteId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "NoteTitleTest5-1",
    }),
  });

  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});


test("/patchNote - Patch with just content", async () => {
  const title = "NoteTitleTest6";
  const content = "NoteContentTest6";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;

  const patchNoteRes = await fetch (`${SERVER_URL}/patchNote/${noteId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "NoteContentTest6-1",
    }),
  });

  const patchNoteBody = await patchNoteRes.json();
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});


test("/deleteAllNotes - Delete one note", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const title = "NoteTitleTest7";
  const content = "NoteContentTest7";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.response).toBe("1 note(s) deleted.");

});


test("/deleteAllNotes - Delete three notes", async () => {
  for (let i = 1; i < 4; i++) {
    const title = `NoteTitleTest8-${i}`;
    const content = `NoteContentTest8-${i}`;

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
  }

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.response).toBe("3 note(s) deleted.");

});


test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  const title = "NoteTitleTest9";
  const content = "NoteContentTest9";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;

  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: "FF0000",
    }),
  });

  const updateNoteColorBody = await updateNoteColorRes.json();

  expect(updateNoteColorRes.status).toBe(200);
  expect(updateNoteColorBody.message).toBe("Note color updated successfully.");

  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
});