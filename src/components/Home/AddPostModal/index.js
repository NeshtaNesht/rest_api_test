import React, { useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField as TextFieldFormik } from "formik-material-ui";

const AddPostModal = ({ visibility, onCloseModal, onSaveModal }) => {
  return (
    <div>
      <Dialog
        open={visibility}
        onClose={onCloseModal}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Новый пост</DialogTitle>
        <Formik
          initialValues={{
            title: "",
            user_id: "",
            body: "",
          }}
          onSubmit={(values, { setSubmiting }) => {
            onSaveModal(values);
            onCloseModal();
          }}
          render={(props) => (
            <>
              <Form>
                <DialogContent>
                  <Field
                    name="title"
                    label="Заголовок"
                    fullWidth
                    component={TextFieldFormik}
                  />
                  <Field
                    name="user_id"
                    label="ID пользователя"
                    type="number"
                    fullWidth
                    component={TextFieldFormik}
                  />
                  <Field
                    name="body"
                    label="Текст поста"
                    multiline
                    rowsMax={10}
                    rows={5}
                    fullWidth
                    component={TextFieldFormik}
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" type="submit">
                    Сохранить
                  </Button>
                  <Button onClick={onCloseModal}>Отмена</Button>
                </DialogActions>
              </Form>
            </>
          )}
        />

        {/* <form onSubmit={onSaveModal}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Заголовок"
              fullWidth
              type="input"
            />
            <TextField
              type="number"
              id="user_id"
              label="ID пользователя"
              fullWidth
            />
            <TextField
              label="Текст поста"
              id="body"
              multiline
              rowsMax={10}
              rows={5}
              fullWidth
            />
          </form> */}
      </Dialog>
    </div>
  );
};

export default AddPostModal;
