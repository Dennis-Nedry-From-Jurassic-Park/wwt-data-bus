# checkbox
```java
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.List;

public class CheckboxBot extends TelegramLongPollingBot {

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasCallbackQuery()) {
            handleCallbackQuery(update.getCallbackQuery());
        } else if (update.hasMessage()) {
            sendCheckboxMessage(update.getMessage().getChatId().toString());
        }
    }

    private void sendCheckboxMessage(String chatId) {
        InlineKeyboardMarkup inlineKeyboardMarkup = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
        List<InlineKeyboardButton> rowInline = new ArrayList<>();
        rowInline.add(new InlineKeyboardButton().setText("Checkbox 1").setCallbackData("checkbox1"));
        rowInline.add(new InlineKeyboardButton().setText("Checkbox 2").setCallbackData("checkbox2"));
        rowsInline.add(rowInline);
        inlineKeyboardMarkup.setKeyboard(rowsInline);

        SendMessage message = new SendMessage();
        message.setChatId(chatId);
        message.setText("Select a checkbox:");
        message.setReplyMarkup(inlineKeyboardMarkup);

        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void handleCallbackQuery(CallbackQuery callbackQuery) {
        String callbackData = callbackQuery.getData();
        // Handle the callback data to toggle the state of the checkbox
        // For example, you could update a database or in-memory data structure
        // Then, send a new message with the updated inline keyboard
    }

    @Override
    public String getBotUsername() {
        return "YourBotUsername";
    }

    @Override
    public String getBotToken() {
        return "YourBotToken";
    }
}

```