const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const embeds = []
const pages = {} 
//Nhét Miêu Tả Vô Mấy Cái ' ' Hoặc " ", Nếu Mà " " Mà Fail, Thì Dùng Lấy Cái ' ' Thay Thế
const descriptions = [
    '<:LArrow:985422675306487829>**__Độ Hiếm__**<:RArrow:985422859994271744>\n  <:5s:985115304961134612><:5s:985115304961134612><:5s:985115304961134612><:5s:985115304961134612><:5s:985115304961134612>\n\n<:LArrow:985422675306487829>**__Mô Tả__**<:RArrow:985422859994271744>\nThủ Lĩnh Đời Đầu Của "Bang Arataki" Địa Bàn Hanamizaka. Sao, Chưa Nghe Qua Bang Araraki À, Đùa Ta Sao?\n\n<:LArrow:985422675306487829>**__Vũ Khí__**<:RArrow:985422859994271744>\nTrọng Kiếm <:claymorenormalatk:985130879296892998>\n\n<:LArrow:985422675306487829>**__Nguyên Liệu__**<:RArrow:985422859994271744>\n> • Sách Thiên Phú: <:eleganerow:985824474978996294>\n> • Boss: <:signoraheart:985824497473044480>\n> • Nguyên Liệu Đột Phá: <:rregalia:985824509263241248> <:onikabuto:985824521040846858> <:prithiva:985114127758405683> <:scondenstate:985824537931305010>\n\n<:LArrow:985422675306487829>**__Hướng Build__**<:RArrow:985422859994271744>\nMain DPS\n\n<:LArrow:985422675306487829>**__Mẹo Kĩ Năng__**<:RArrow:985422859994271744>\n Nhân Vật Này Không Có Mẹo Kĩ Năng Nổi Bật\n\n<:LArrow:985422675306487829>**__Chỉ Số Chính__**<:RArrow:985422859994271744>\n> • <:sands:985113511413817344> Đồng Hồ: DEF%\n> • <:goblet:985113549447774248> Ly: ST Nham\n> • <:circlet:985113626119639110> Mũ: Tỉ Lệ Bạo/ST Bạo\n\n<:LArrow:985422675306487829>**__Chỉ Số Phụ__**<:RArrow:985422859994271744>\n> 1 • Tỉ Lệ Bạo/ST Bạo\n> 2 • DEF%\n> 3 • Hiệu Quả Nạp Nguyên Tố\n> 4 • ATK%\n> 5 • DEF +n\n> 6 • ATK +n\n\n<:LArrow:985422675306487829>**__Ưu Tiên Thiên Phú__**<:RArrow:985422859994271744>\nTấn Công Thường > Nộ > Skill',
    "<:LArrow:985422675306487829>**__Các Loại Vũ Khí__**<:RArrow:985422859994271744>\n> 1 • <:5s:985115304961134612> <:redhorn:985820133396185098> [Xích Giác Phá Thạch Đao](https://paimon.moe/weapons/redhorn_stonethresher)\n> 2 • <:4s:985115524692336661> <:sspine:985820291701809162> [Kiếm Li Cốt](https://paimon.moe/weapons/serpent_spine)\n> 3 • <:5s:985115304961134612> <:skyward_pride:985820387768148018> [Thiên Không Kiêu Ngạo](https://paimon.moe/weapons/skyward_pride)\n> 4 • <:4s:985115524692336661> <:whiteblind:985820622020042792> [Kiếm Bạch Ảnh](https://paimon.moe/weapons/whiteblind)\n\n<:LArrow:985422675306487829>**__Bộ Thánh Di Vật__**<:RArrow:985422859994271744>\n> 1 • <:huskflower:985111782714658876> Giấc Mộng Phù Hoa **`4`**\n> 2 • <:retracingflower:985822818124062750> Sao Băng Bay Ngược **`4`**\n> 3 • **Chọn 2** <:huskflower:985111782714658876> Giấc Mộng Phù Hoa **`2`** <:archaicflower:985112133324918814> Phiến Đá Lâu Đời **`2`** <:emblemflower:985823728279638056> Dấu Ấn Ngăn Cách **`2`**",
    '<:LArrow:985422675306487829>**__CungMệnh__**<:RArrow:985422859994271744>\n> 1 • <:ittoc1:985821870542688256> **Đứng Lại, Ta Nói Cho Nghe** - Sau Khi Thi Triển `Siêu Cấp Quỷ Vương - Itto Giáng Lâm!`, Arataki Itto Nhận 2 Tầng Hiệu Ứng "Quỷ Lực Vô Song". Sau 1s, Arataki Itto Mỗi 0.5s Sẽ Nhận Thêm 1 Tầng "Quỷ Lực Vô Song", Duy Trì 1.5s\n\n> 2 • <:ittoc2:985821941376106496> **Gọi Anh Em, Đánh Hội Đồng** - Sau Khi Thi Triển `Siêu Cấp Quỷ Vương - Itto Giáng Lâm!`, Trong Đội Cứ Mỗi Nhân Vật Có Thuộc Tính Nguyên Tố Là Nham, Đều Sẽ Khiến Itto Giảm 1.5s CD Kỹ Năng Nộ, Đồng Thời khiến Arataki Itto hồi phục 6 điểm năng lượng nguyên tố.\n> Thông Qua Cách Này, Tối Đa Giảm 4.5s CD Và Hồi Phục 18 Điểm Năng Lượng Nguyên Tố.\n\n> 3 • <:ittoc3:985822044023312474> **Có Ta Ở Đây, Đừng Sợ** - Cấp Kỹ Năng `Tuyệt Kỹ Masatsu - Akaushi Công Phá!`` +3.\n> Tăng Tối Đa Đến Cấp 15.\n\n> 4 • <:ittoc4:985822218338594856> **Cơm Nước Trại Giam Ngon Thật!** - Sau Khi Kết Thúc Trạng Thái "Nộ Mục Quỷ Vương" Của Kỹ Năng `Siêu Cấp Quỷ Vương - Itto Giáng Lâm!`, Sức Phòng Ngự Của Tất Cả Nhân Vật Trong Đội Gần Đó Tăng 20%, Sức Tấn Công Tăng 20%, Duy Trì 10s.\n\n> 5 • <:ittoc5:985822311338893322> **Mười Năm Vang Danh Hanamizaka** - Cấp Kỹ Năng `Siêu Cấp Quỷ Vương - Itto Giáng Lâm!` +3.\n> Tăng Tối Đa Đến Cấp 15.\n\n> 6 • <:ittoc6:985822566780387328> **Bổn Đại Gia Là Arataki Itto** - Tăng 70% Sát Thương Bạo Kích Của Trọng Kích Của Arataki Itto; Ngoài Ra, Khi Thi Triển "Arataki Kesagiri" Sẽ Có 50% Xác Suất Không Tiêu Hao "Quỷ Lực Vô Song"',
    '<:LArrow:985422675306487829>**__Thiên Phú__**<:RArrow:985422859994271744>\n> 1 • <:claymorenormalatk:985130879296892998> **Tấn Công Thường - Huyền Thoại Đấm Nhau**\n> Tấn Công Thường\n> Thực Hiện Tối Đa 4 Lần Chém Liên Tiếp\n> Lần Chém Thứ 2 Và Thứ 4 Trúng Địch Sẽ Lần Lượt Nhận 1 Tầng Và 2 Tầng "Quỷ Lực Vô Song".\n> Tối Đa Sở Hữu 5 Tầng "Quỷ Lực Vô Song", Mỗi Lần Kích Hoạt Đều Sẽ Làm Mới Thời Gian Duy Trì Của Quỷ Lực Vô Song Đã Có\n> Ngoài Ra, Trong Một Thời Gian Ngắn Sau Khi Xung Kích Hoặc Thi Triển Kĩ Năng Nguyên Tố `Tuyệt Kỹ Masatsu - Akaushi Công Phá!`, Số Lần Liên Kích Đánh Thường Sẽ Không Bị Tái Lập.\n> Trọng Kích\n> Khi Nhấn Giữ Để Thực Hiện Trọng Kích, Nếu Có Quỷ Lực Vô Song Sẽ Thi Triển "Arataki Kesagiri" Không Tiêu Tốn Thể Lực. Arataki Kesagiri Mỗi Lần Tấn Công Sẽ Tiêu Hao Một Tầng Quỷ Lực Vô Song; Khi Tiêu Hao Đến Tầng Cuối Cùng Sẽ Thi Triển Thêm Đòn Kết Liễu Mạnh Mẽ.\n> Khi Không Có Quỷ Lực Vô Song Sẽ Tiêu Hao Thể Lực Để Thi Triển Một Lần Nhát Chém Saichimonji Cực Manbj.\n> Tấn Công Khi Đáp\n> Đáp Xuống Đất Từ Trên Không, Tấn Công Kẻ Địch Trên Đường, Đồng Thời Gây Sát Thương Phạm Vi Khi Chạm Đất.\n\n> 2 • <:ittoelement:985819695213072434> **Tuyệt Kỹ Masatsu - Akaushi Công Phá!**\n> *Tên Chiêu Thưc Này Được Lấy Cảm Hứng Từ Cuốn Tiểu Thuyết "Quỷ Võ Đạo" Của Tác Giả Junkichi，Nhưng Nếu Giữ Tên Gốc Là "Tuyệt Kỹ Onisatsu" Có Vẻ Bị Dính Bản Quyền, Hơn Nữa Itto Cũng Là "Oni" Mà.*\n> Ném Bò Con "Ushi" - Thành Viên Ngoài Biên Chế Của Bang Arataki, Gây Sát Thương Nguyên Tố Nham Cho Kẻ Địch Trúng Phải! Khi "Ushi" Trúng Kẻ Địch Sẽ Cung Cấp Cho Arataki Itto 1 Tầng "Quỷ Lực Vô Song".\n> "Ushi" Sẽ Ở Lại Trong Trận Để Chi Viện:\n> ·Liên Tục Khiêu Khích Kẻ Địch Xung Quanh, Thu Hút Hỏa Lực;\n> ·Độ Bền Sẽ Dựa Vào Tỷ Lệ Giới Hạn HP Của Arataki Itto;\n> ·Khi Chịu Sát Thương Sẽ Cung Cấp Cho Arataki Itto 1 Tầng "Quỷ Lực Vô Song". Mỗi 2 Giây Tối Đa Chỉ Có Thể Nhận Được 1 Tầng Thông Qua Cách Này;\n> ·Khi Hết Độ Bền Hoặc Thời Gian Tồn Tại, "Ushi" Sẽ Để Lại Cho Arataki Itto 1 Tầng "Quỷ Lực Vô Song" Rồi Chạy Mất.\n> Nhấn giữ\n> Điều Chỉnh Hướng Ném.\n> "Ushi" Sẽ Được Tính Là Tạo Vật Nguyên Tố Nham; Cùng Lúc Chỉ Có Thể Tồn Tại Một "Ushi" Do Bản Thân Arataki Itto Ném Ra.\n\n> 3 • <:ittoburst:985819833159516270> **Siêu Cấp Quỷ Vương - Itto Giáng Lâm!**\n> *Bí Kỹ Trong Bí Kỹ Của Itto (Tự Xưng). Nếu Bắt Chước Người Khác Để Mạnh Hơn Thì Thật Vô Nghĩa, Vì Thế Gian Này Chỉ Có Quỷ Vương Arataki Itto Mới Là Vô Đối Thôi, Cho Nên Để Tự Itto Bắt Chước Itto Là Được Rồi!*\n> *Shouta Cảm Thấy Rất Ngầu.*\n> Đã Đến Lúc Thể Hiện Bản Thân! Trong Khoảng Thời Gian Tiếp Theo, Itto Hóa Thân Thành "Nộ Mục Quỷ Vương", Sử Dụng Quỷ Vương Kim Toái Bổng Để Chiến Đấu.\n> Đặc Tính Cụ Thể Như Sau:\n> ·Sát Thương Của Tấn Công Thường, Trọng Kích, Tấn Công Khi Đáp Sẽ Chuyển Hóa Thành Sát Thương Nguyên Tố Nham Không Thể Bị Đính Kèm Thay Thế;\n> ·Tăng Tốc Độ Đánh Thường Của Arataki Itto, Đồng Thời Tăng Sức Tấn Công Dựa Theo Phòng Ngự\n> ·Tấn Công Lần Thứ 1 Và 3 Trúng Kẻ Địch Sẽ Cung Cấp Cho Arataki Itto 1 Tầng "Quỷ Lực Vô Song";\n> ·Kháng Tất Cả Nguyên Tố Và Kháng Vật Lý Của Arataki Itto Giảm 20%.\n> Trạng Thái "Nộ Mục Quỷ Vương" Sẽ Bị Hủy Khi Arataki Itto Rời Trận.\n\n<:LArrow:985422675306487829>**__Thiên Phú Cố Định__**<:RArrow:985422859994271744>\n> 1 • <:ittospecial1:985821278118223912> **Arataki Đệ Nhất** - Arataki Itto Khi Thi Triển "Arataki Kesagiri" Liên Tục Có Hiệu Quả Sau:\n> ·Mỗi Lần Trảm Kích Đều Sẽ Khiến Tốc Độ Tấn Công Của Trảm Kích Lần Sau Tăng 10%, Tối Đa Tăng 30% Bằng Cách Này;\n> ·Tăng Khả Năng Kháng Gián Đoạn.\n> Hiệu Quả Sẽ Biến Mất Khi Kết Thúc Thi Triển Liên Tục. *(Reqiure Đột Phá Lần 1)*\n\n> 2 • <:ittospecial2:985821590195429396> **Huyết Mạch Xích Quỷ** - Tăng Sát Thương Gây Ra Từ "Arataki Kesagiri", Lương Tăng Thêm Sát Thương Sẽ Dựa Vào 35% Phòng Ngự Của Arataki Itto.\n\n> 3 • <:woodbonus:985820935670100038> **Bổ Củi** - Khi Nhân Vật Của Bản Thân Trong Đội Đốn Gỗ Bằng Cách Tấn Công Cây Cối, Có 25% Xác Xuất Nhận Được Thêm Gỗ.',
    '<:LArrow:985422675306487829>**THÔNG TIN BUILD ĐỘI HÌNH CHO ARATAKI ITTO**<:RArrow:985422859994271744>\nArataki Itto Là 1 Nhân Vật DPS 5 <:5s:985115304961134612> Hệ Nham, Có Chỉ Số Và Kĩ Năng Nộ Giống **Noelle** Nên Các Chỉ Số Buff Của Các Nhân Vật Support Là **ST Nguyên Tố Nham** Và **DEF**, Bất Lợi Duy Nhất Của Arataki Itto Là Range Trọng Kích Ngắn. Mỗi Đợt Thi Triển Kĩ Năng Nguyên Tố Hay Kết Thúc Đòn Tấn Công Sẽ Giúp Arataki Itto Nạp 1 Ấn Được Gọi Là **Arataki Kesigiri** (Stack Được 5 Lần) Mỗi Stack Sẽ Tăng Khả Năng Kháng Gián Đoạn, Tốc Độ Tấn Công Và Không Tiêu Hao Thể Lực Khi Thi Triển Trọng Kích. Thi Triển Kĩ Năng Nộ Sẽ Khiến Cho Đòn Đánh Thường Và Trọng Kích Sẽ Đính Kèm **Nguyên Tố Nham** Và Không Thể Đính Kèm Thay Thế, Trong Trạng Thái Này Sẽ Tăng Tốc Độ Tấn Công Thường Và Sát Thương Mỗi Đòn Đánh Sẽ Dựa Vào DEF Và ATK Của Arataki Itto.\n\n<:LArrow:985422675306487829>**ĐỘI HÌNH PHÙ HỢP**<:RArrow:985422859994271744>\n`Main DPS`\n> **Arataki Itto** <:itto:985432070245453874>\n\n`Sub DPS - Support`\n> **Albedo** <:albedo:985117187188604978> - **Ningguang** <:ningguang:985826634043117578>\n\n`Support`\n> **Gorou** <:gorou:985432580037959681> \n\n`Support`\n> **Zhongli** <:zhongli:985432673398951936> *(Reqiured To Sub-DPS)*',
               ]
//Nhét Link Ảnh Vô
const images = [
    "https://static.wikia.nocookie.net/gensin-impact/images/c/c3/Character_Arataki_Itto_Full_Wish.png/revision/latest?cb=20220507160209",
    "",
    "",
    "",
              ]
//Do Quá Limit 4096 Embed Ở Description Trang 3 => Tách Nó Ra Làm 2
for (let g2 = 0; g2 < 5; ++g2) {
    const description = descriptions[g2]
    const image = images[g2]
    embeds.push(new MessageEmbed()
        .setTitle('<:ittoconfidence:985852170823958549> **Arataki Itto** <:geo:985117972660092979>')
        .setThumbnail('https://cdn.discordapp.com/attachments/985136502323417108/986131682170130472/unknown.png ') 
        .setDescription(description)
        .setColor('#E4B400')
        .setImage(image)
        .setFooter({text: `Trang: ${g2+1}/5`, iconURL: ''}))
}

const getRow = (id) => {
const row = new MessageActionRow()
    row.addComponents(
        new MessageButton()
        .setCustomId('prev')
        .setStyle('SECONDARY')
        .setEmoji('⏪')
        .setLabel('Trang Trước')
        .setDisabled(pages[id] === 0)
    )
    row.addComponents(
        new MessageButton()
        .setCustomId('next')
        .setStyle('SECONDARY')
        .setEmoji('⏩')
        .setLabel('Trang Sau')
        .setDisabled(pages[id] === embeds.length - 1 )
    )
    return row
}
module.exports = {
    category: 'Geo',
    description: "Show Itto's Stats",
    slash: true,
    callback: async ({user, interaction, channel}) => {
        const id = user.id
        pages[id] = pages[id] || 0

        const embed = embeds[pages[id]]
        let collector

        const filter = (i) => {return i.user.id === user.id}
        const time = 1000*60*5

       await interaction.reply({
            embeds:[embed],
            components: [getRow(id)],
        })
        collector = channel.createMessageComponentCollector({ filter, time })
        await  collector.on('collect', (btnIntg2) => {
            if(!btnIntg2) {
                return
            }
            btnIntg2.deferUpdate()
            if(
                btnIntg2.customId !== 'prev' &&
                btnIntg2.customId !== 'next'
            )  {
                return
            }
            if(btnIntg2.customId === 'prev' && pages[id2]>0) {
                --pages[id]
            } else if(
                btnIntg2.customId === 'next' && pages[id2] < embeds.length -1
            )   {
                ++pages[id]
            }
             interaction.editReply({
                embeds: [embeds[pages[id]]],
                components: [getRow(id)],
            })  
        })
    },
}
 