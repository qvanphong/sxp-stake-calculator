const messages = {
  en: {
    title: "SXP Stake Calculator",
    use_instruction: "How to use",
    stake_instruction: "How to stake SXP",
    input_balance: "Input your SXP balance here",
    voted: "Voted",
    public: "Public",
    private: "Private",
    learn_more: "Click to learn more",
    delegate_table: {
      name: "Name",
      daily: "Daily Reward",
      weekly: "Weekly Reward",
      shares: "Shares",
      payout_interval: "Payout Interval",
    },
    delegate: {
      status: "This is a {status} delegate.",
      contribute_status: "Contribute status",
    },
    contribute: {
      inactive: "Inactive",
      never: "Never",
      semi_active: "Semi active",
      active: "Active",
    },
    instruction: {
      step: "Step",
      step_1_input: "Input your SXP balance into the <b>input field</b> below:",
      step_1_description:
        'If you already voted for the delegate you are looking for, check the <b>"Voted"</b> checkbox',
      step_2_description:
        "The app will calculate the profit you earn everyday and show in the big table. Now you will have to make a decide which delegate you should vote for yourself.",
      tips: "Some tips you may need to know",
      tip_sort:
        "If you want to sort the data, just click on the table heading.",
      tip_voted:
        'If you already voted for the delegate you are looking for, check the "Voted" check box, that will help calculate more accuracy.',
      tip_private:
        "Some delegate show 0% share, most of them have private deal for daily payout, you have to find out yourself.",
      tip_detail:
        "You can learn more about delegate by click on delegate name. (Highly recommend learn about delegate)",
      tip_ranking: "The red number next to the delegate name is ranking.",
      tip_payout: `Be careful! There is 1 more thing to decide when you will receive
            your daily payout, that is <b>minimum payout</b>(in the payout
            interval), your reward must meets the minimum payout that delegate
            require. <br />(For example: Everyday you get 0.005 SXP from
            delegate, but their minimum payout is 0.01, which mean you will
            receive your payout every 2 days.)`,
      tip_fork: `Feel free to fork or send an issue on
            <a
              class="underline"
              href="https://github.com/qvanphong/sxp-stake-calculator"
              >Github</a
            >`,
    },
  },

  tr: {
    title: "SXP Yatırım Hesaplayıcı",
    use_instruction: "Nasıl Kullanılır",
    stake_instruction: "SXP Yatırımı Nasıl Yapılır?",
    input_balance: "SXP Bakiyenizi Buraya Girin",
    voted: "Oylandı",
    public: "Herkese Açık",
    private: "Özel",
    learn_more: "Daha fazlasını öğrenmek için tıklayın",
    delegate_table: {
      name: "Adı",
      daily: "Günlük Ödül",
      weekly: "Haftalık Ödül",
      shares: "Paylaşım",
      payout_interval: "Ödeme Aralığı",
    },
    delegate: {
      status: "Bu bir {status} delegedir.",
      contribute_status: "Katkı durumu",
    },
    contribute: {
      inactive: "İnaktif",
      never: "Hiç",
      semi_active: "Yarı aktif",
      active: "Aktif",
    },
    instruction: {
      step: "Adım",
      step_1_input: "SXP Bakiyenizi aşağıdaki <b>alana</b> girin:",
      step_1_description:
        'İstediğiniz delegeye zaten oy verdiyseniz, <b>"Oylandı"</b> onay kutusunu işaretleyin.',
      step_2_description:
        "Uygulama, her gün kazandığınız kârı hesaplayacak ve büyük tabloda gösterecektir. Şimdi hangi delegeye oy vereceğinize karar vermeniz gerekecek.",
      tips: "Bilmeniz gereken bazı ipuçları",
      tip_sort: "Verileri, sütun başlıklarına tıklayarak sıralayabilirsiniz.",
      tip_voted:
        'İstediğiniz delegeye zaten oy verdiyseniz, kârınızı daha doğru hesaplamak için "Oylandı" onay kutusunu işaretleyin.',
      tip_private:
        "Paylaşım oranı %0 olarak belirtilen delegeler, özel paylaşım anlaşması dahilinde ödül dağıtıyor olabilir; bu durumda kendileriyle görüşebilirsiniz.",
      tip_detail:
        "Delege adına tıklayarak delege hakkında daha fazla bilgi edinebilirsiniz. (Delege hakkında bilgi edinmenizi şiddetle tavsiye ederim)",
      tip_ranking:
        "Delege adının yanındaki kırmızı sayı delege sıralamasını belirtir.",
      tip_payout: `Günlük ödemenizi ne zaman alacağınızı hesaplarken dikkat edilmesi gereken
            bir diğer nokta; Delegenin (belirlediği ödeme aralığında) yaptığı <b>minimum
            ödeme</b> miktarının göz önünde bulundurulmasıdır. Kazandığınız ödülün size
            günlük olarak dağıtılması için, tutar delegenin belirlediği minimum ödeme
            miktarının üstünde olmalıdır. <br />(Örneğin: Günlük kazancınız 0.005 SXP fakat
            delegenin belirlediği minimum ödeme miktarı 0.01 SXP ise;
            ödülünüzü ancak 2 günde bir alabilirsiniz.)`,
      tip_fork: `Yazılımı fork etmekten ve sorunlarınızı
            <a
              class="underline"
              href="https://github.com/qvanphong/sxp-stake-calculator"
              >Github</a
            >a göndermekten çekinmeyin`,
    },
  },
  vi: {
    title: "Bộ Tính Stake SXP",
    use_instruction: "Hướng dẫn",
    stake_instruction: "Hướng dẫn stake",
    input_balance: "Nhập số SXP của bạn tại đây",
    voted: "Đã vote",
    public: "Công khai",
    private: "Ẩn",
    learn_more: "Nhấn để xem chi tiết",
    delegate_table: {
      name: "Tên",
      daily: "Tổng thưởng hằng ngày",
      weekly: "Tổng thưởng hàng tuần",
      shares: "Chia thưởng",
      payout_interval: "Chu kỳ trả thưởng",
    },
    delegate: {
      status: "Đây là delegate {status}.",
      contribute_status: "Tình trạng đóng góp",
    },
    contribute: {
      inactive: "Dừng đóng góp",
      never: "Chưa từng đóng góp",
      semi_active: "Có đóng góp",
      active: "Tích cực đóng góp",
    },
    instruction: {
      step: "Bước",
      step_1_input: "Nhập số SXP của bạn vào phần nhập như trong ảnh",
      step_1_description:
        'Nếu bạn đã vote cho delegate mà bạn đang tìm, hãy tick vào ô <b>"Đã Vote"</b>',
      step_2_description:
        "Ứng dụng sẽ tự động tính và đưa ra số SXP dự tính mà bạn sẽ nhận được.",
      tips: "Một số mẹo bạn nên biết:",
      tip_sort: "Nếu bạn muốn sắp xếp thứ thự dữ liệu, hãy nhấn vào tên cột",
      tip_voted:
        'Nếu bạn đã vote cho delegate mà bạn đang kiểm thử, hãy tick vào ô "Đã Vote", phần thưởng SXP sẽ có sự chênh lệch tùy vào bạn đã vote hay chưa.',
      tip_private:
        "Một số delegate trả thưởng 0%, đây là những delegate, họ chỉ trả thưởng cho một số người nhất định.",
      tip_detail:
        "Bạn có thể xem thông tin chi tiết của delegate nhờ bấm vào tên delegate. (Khuyến khích nên tìm hiểu về delegate mà bạn muốn vote)",
      tip_ranking: "Số kế bên delegate chính là hạng của delegate dựa vào vote",
      tip_payout: `Lưu ý! Nên để ý phần <b>Chu kỳ trả thưởng</b> Số lượng SXP thưởng của bạn phải tích lũy
            đến số SXP mà delegate đề cập ra mới có thể nhận thưởng. <br />
            (Ví dụ: Mỗi ngày bạn nhận được 0.005 SXP, nhưng delegate đề ra mức trả thưởng là 0.01 SXP.
            Tức nghĩa là bạn sẽ cần đến 2 ngày mới có thể nhận được thưởng 1 lần)`,
      tip_fork: `Bạn có thể xem qua, fork hoặc gửi issue vào
            <a
              class="underline"
              href="https://github.com/qvanphong/sxp-stake-calculator"
              >Github</a
            > của mình`,
    },
  },
};

export default messages;
