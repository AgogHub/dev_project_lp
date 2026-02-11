import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, CheckCircle2, Shield, FileText, Clock, DollarSign, Heart, Brain, Search, AlertTriangle, Code } from 'lucide-react'

const CATEGORIES = [
    { value: 'ai', label: 'AI導入' },
    { value: 'estimate', label: '見積もりチェック' },
    { value: 'risk', label: '炎上リスク診断' },
    { value: 'app', label: 'アプリ開発' },
    { value: 'other', label: 'その他' },
] as const

function ThanksPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-6">
                    <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    お問い合わせありがとうございます
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    お問い合わせを受け付けました。<br />
                    担当者より2営業日以内にご連絡いたします。
                </p>
                <a
                    href={`${import.meta.env.BASE_URL}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                    トップページへ戻る
                </a>
            </div>
        </div>
    )
}

function App() {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        message: '',
        category: '' as string
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage('')

        try {
            const submitFormData = new FormData()
            submitFormData.append('company', formData.company)
            submitFormData.append('name', formData.name)
            submitFormData.append('email', formData.email)
            submitFormData.append('message', formData.message)
            submitFormData.append('category', formData.category)

            const response = await fetch(`${import.meta.env.BASE_URL}api/contact.php`, {
                method: 'POST',
                body: submitFormData,
            })

            const data = await response.json()

            if (data.success) {
                // コンバージョン計測のためthanksページへ遷移
                window.location.href = `${import.meta.env.BASE_URL}index.html?thanks=1`
                return
            } else {
                setSubmitMessage(data.message || '送信に失敗しました。しばらく時間をおいて再度お試しください。')
            }
        } catch (error) {
            setSubmitMessage('送信に失敗しました。しばらく時間をおいて再度お試しください。')
        } finally {
            setIsSubmitting(false)
        }
    }

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact')
        contactSection?.scrollIntoView({ behavior: 'smooth' })
    }

    // thanksページ（コンバージョン計測用）
    const isThanksPage = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('thanks') === '1'
    if (isThanksPage) {
        return <ThanksPage />
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <section className="relative bg-white py-8 md:py-12 px-4 overflow-hidden">
                {/* トップバナー */}
                <div className="bg-blue-800 text-white py-2 px-4 text-center text-sm font-semibold mb-6">
                    ITドクターミズキ
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* 背景装飾：抽象的な青い形状とドットパターン */}
                    <div className="absolute left-0 top-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-blue-50 rounded-full opacity-40 blur-2xl"></div>
                    <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-blue-50 rounded-full opacity-40 blur-2xl"></div>

                    {/* ドットパターン */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}></div>

                    <div className="relative z-20">
                        {/* サービス名バッジ */}
                        <div className="inline-block mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg text-base font-bold">
                            AI導入＆見積もりチェック＆アプリ開発
                        </div>

                        {/* メインコンテンツエリア */}
                        <div className="grid md:grid-cols-12 gap-6 items-center mb-8">
                            {/* 左側：イラストエリア */}
                            <div className="md:col-span-3 flex items-center justify-center">
                                <div className="relative w-32 h-32 md:w-40 md:h-40">
                                    <div className="absolute inset-0 bg-blue-100 rounded-2xl flex items-center justify-center">
                                        <FileText className="w-16 h-16 md:w-20 md:h-20 text-blue-600" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-blue-200 rounded-lg p-2">
                                        <Shield className="w-8 h-8 text-blue-700" />
                                    </div>
                                </div>
                            </div>

                            {/* 中央：メインヘッドライン */}
                            <div className="md:col-span-6 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4 leading-tight">
                                    ITの事ならなんでも<br />
                                    <span className="text-blue-600">お任せください！</span>
                                </h1>
                            </div>

                            {/* 右側：プロフィール画像 */}
                            <div className="md:col-span-3 flex items-center justify-center relative">
                                <div className="relative">
                                    <img
                                        src={`${import.meta.env.BASE_URL}profile-image.png`}
                                        alt="ITドクターミズキ プロフィール"
                                        className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                                    />
                                    {/* 経験バッジ */}
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full px-3 py-1 text-xs font-bold text-gray-900 border-2 border-dotted border-yellow-500 shadow-lg">
                                        IT一筋<br />10年以上
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* キーフィーチャー：4つの青い矩形ボタン */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            <div className="bg-blue-600 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold shadow-md">
                                レスポンスが速い
                            </div>
                            <div className="bg-blue-600 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold shadow-md">
                                リーズナブルで確実
                            </div>
                            <div className="bg-blue-600 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold shadow-md">
                                親しみやすい人柄
                            </div>
                            <div className="bg-blue-600 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold shadow-md">
                                <span className="text-yellow-300">初回相談無料</span>
                            </div>
                        </div>

                        {/* サービス：楕円形ボタン */}
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                            <div className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full text-sm font-semibold shadow-sm">
                                AI導入
                            </div>
                            <div className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full text-sm font-semibold shadow-sm">
                                見積もりチェック
                            </div>
                            <div className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full text-sm font-semibold shadow-sm">
                                炎上リスク診断
                            </div>
                            <div className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full text-sm font-semibold shadow-sm">
                                アプリ開発
                            </div>
                        </div>

                        {/* サポートテキスト */}
                        <p className="text-center md:text-left text-blue-900 font-semibold mb-6 text-lg">
                            その他IT発注のことならなんでも！<br />
                            IT発注見積もりチェックにおまかせください！
                        </p>

                        {/* CTAボタン */}
                        <div className="flex justify-center md:justify-start">
                            <Button
                                onClick={scrollToContact}
                                size="lg"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all font-bold"
                            >
                                お問い合わせ（初回相談無料）
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4つのサービス紹介セクション */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        4つのサービスで、ITの悩みを解決します
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        ITドクターミズキが提供する、中小企業向けのIT支援サービス
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* AI導入 */}
                        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg border border-blue-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <Brain className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">AI導入</h3>
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                ChatGPT、Claude、その他AIツールの導入をサポートします。業務効率化やコスト削減のための最適なAIツール選定から、実際の導入・運用まで一貫してサポートいたします。
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>AIツールの選定・比較</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>導入計画の立案</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>社員への教育・研修</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>運用サポート</span>
                                </li>
                            </ul>
                        </div>

                        {/* 見積もりチェック */}
                        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg border border-blue-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <Search className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">見積もりチェック</h3>
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                既にシステム会社・フリーランスからもらっている見積もり・提案書・要件定義書を、第三者のプロエンジニア視点でチェックします。「価格は妥当か？」「この機能は本当に必要か？」を経営者目線でコメントします。
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>見積もり・提案書のチェック</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>価格の妥当性評価</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>機能の必要性判断</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>フィードバックレポート提供</span>
                                </li>
                            </ul>
                        </div>

                        {/* 炎上リスク診断 */}
                        <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-8 shadow-lg border border-red-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center">
                                    <AlertTriangle className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">炎上リスク診断</h3>
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                「この仕様だと炎上リスクはないか？」を第三者のプロエンジニア視点でチェックします。納期遅延・仕様ブレ・コミュニケーション不一致による炎上を、発注前に防ぎます。
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <span>仕様書のリスクチェック</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <span>納期の妥当性評価</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <span>コミュニケーションリスクの指摘</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <span>改善提案の提供</span>
                                </li>
                            </ul>
                        </div>

                        {/* アプリ開発 */}
                        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-lg border border-green-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                                    <Code className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">アプリ開発</h3>
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Webアプリケーション、モバイルアプリ（iOS/Android）の開発をサポートします。要件定義から設計、開発、運用まで一貫して対応いたします。
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>要件定義・設計支援</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>Webアプリ開発</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>モバイルアプリ開発</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>運用・保守サポート</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* サービス選定のサポートテキスト */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            どのサービスが必要か分からない？<br />
                            まずは無料相談で、お客様の課題をヒアリングさせていただきます。
                        </p>
                        <p className="text-gray-700 font-semibold">
                            お客様の状況に合わせて、最適なサービスをご提案いたします。
                        </p>
                    </div>
                </div>
            </section>

            {/* サービスの流れセクション */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        サービスの流れ
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                1
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">フォームからお問い合わせ</h3>
                                <p className="text-gray-600">まずは無料相談フォームからお気軽にお問い合わせください</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                2
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">事前ヒアリング（日程調整）</h3>
                                <p className="text-gray-600">メールまたは電話で日程を調整させていただきます</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                3
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">資料共有（見積書・提案書・要件定義書など）</h3>
                                <p className="text-gray-600">既にお持ちの見積もりや提案書を共有していただきます</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                4
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">無料相談（オンライン・30分程度）</h3>
                                <p className="text-gray-600">Zoomで直接お話ししながら、見積もりの妥当性やリスクについて無料でご相談いただけます</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                5
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">ご契約・サービス開始</h3>
                                <p className="text-gray-600">ご希望の場合は、正式にご契約いただき、見積もりチェックや継続的なサポートを開始します</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ご依頼するメリットセクション */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        ご依頼するメリット
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        私にご依頼いただくメリットは、主に3つです。
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Clock className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">レスポンスが速い</h3>
                            <p className="text-gray-700 text-center leading-relaxed">
                                ご連絡いただいたら当日か翌営業日、遅くとも翌々営業日には返信します。
                                作業の納期も、独立してから100%守っております。
                                できないお約束は最初からしません。
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <DollarSign className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">リーズナブルで確実</h3>
                            <p className="text-gray-700 text-center leading-relaxed">
                                ITエンジニアを一人雇うと数万～数十万円の人件費がかかりますが、
                                私の場合は月額2万円からご依頼いただけます。
                                また、明朗会計を心がけておりますので、基本的には月額報酬内で作業させていただきます。
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Heart className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">親しみやすい人柄</h3>
                            <p className="text-gray-700 text-center leading-relaxed">
                                対応が事務的すぎたり、専門用語を多用したりしないよう、気を付けております。
                                経営者目線で、分かりやすくお伝えすることを心がけています。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 料金セクション */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        料金
                    </h2>

                    {/* 見積もりチェック */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">見積もりチェック</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            既にシステム会社・フリーランスからもらっている見積もり・提案書・要件定義書を、
                            第三者のプロエンジニア視点でチェックするサービスです。
                            「価格は妥当か？」「この仕様だと炎上リスクはないか？」「本当にこの機能は必要か？」を、
                            経営者目線でコメントします。
                        </p>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">月額料金（税抜）</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 text-gray-900 font-medium">30,000円</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            見積もりチェック（1件あたり）<br />
                                            <span className="text-sm text-gray-600">
                                                ・オンラインヒアリング（30〜45分）<br />
                                                ・見積もり・提案書・要件定義書のチェック<br />
                                                ・簡易フィードバックレポートの提供
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 text-gray-900 font-medium">50,000円</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            見積もりチェック（複数件・月2件まで）<br />
                                            <span className="text-sm text-gray-600">
                                                ・月2件まで見積もりチェック可能<br />
                                                ・オンラインヒアリング（各30〜45分）<br />
                                                ・簡易フィードバックレポートの提供
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                            ※ 見積もりの複雑さやページ数によって、追加料金が発生する場合がございます。詳しくはお問い合わせください。
                        </p>
                    </div>

                    {/* 月額サポートプラン */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">月額サポートプラン</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            IT発注に関する継続的なサポートをご希望の方におすすめのプランです。
                        </p>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">月額料金（税抜）</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 text-gray-900 font-medium">20,000円</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            ベーシックプラン<br />
                                            <span className="text-sm text-gray-600">
                                                ・月1回の見積もりチェック<br />
                                                ・メール・チャットでの相談（月5回まで）<br />
                                                ・簡易フィードバックレポートの提供
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 text-gray-900 font-medium">50,000円</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            スタンダードプラン<br />
                                            <span className="text-sm text-gray-600">
                                                ・月2回の見積もりチェック<br />
                                                ・メール・チャットでの相談（無制限）<br />
                                                ・オンラインヒアリング（月2回まで）<br />
                                                ・簡易フィードバックレポートの提供
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-gray-900 font-medium">100,000円</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            プレミアムプラン<br />
                                            <span className="text-sm text-gray-600">
                                                ・月3回の見積もりチェック<br />
                                                ・メール・チャットでの相談（無制限）<br />
                                                ・オンラインヒアリング（無制限）<br />
                                                ・詳細フィードバックレポートの提供<br />
                                                ・緊急時の対応（24時間以内）
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* スポット相談 */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">スポット相談</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            単発でのご相談や、月額プランに含まれない追加のご相談に対応いたします。
                        </p>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">料金（税抜）</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-6 py-4 text-gray-900 font-medium">10,000円</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            オンライン相談（30分）<br />
                                            <span className="text-sm text-gray-600">
                                                ・Zoomでのオンライン相談<br />
                                                ・IT発注に関するご質問・ご相談
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <p className="text-gray-700 text-sm leading-relaxed">
                            ※ 料金はすべて税抜き表示です。別途消費税がかかります。<br />
                            ※ 見積もりの複雑さやページ数、相談内容の難易度によって、追加料金が発生する場合がございます。詳しくはお問い合わせください。<br />
                            ※ 初回相談は無料です。お気軽にお問い合わせください。
                        </p>
                    </div>
                </div>
            </section>

            {/* 実績セクション */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        実績
                    </h2>
                    <p className="text-center text-gray-600 mb-8 text-lg">
                        今までお受けしてきたお仕事の実績です。
                    </p>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900 w-1/3">対象</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        法人（ひとり社長、従業員数1～100名程度）<br />
                                        個人事業主（1人～従業員数10名程度）
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900 w-1/3">業種</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        IT、飲食、製造、建設、不動産、卸売、介護、医療、美容、民泊、教育、
                                        個人事業主（デザイナー、ライター、プログラマー、副業など）
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900 w-1/3">依頼内容</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        見積もりチェック、炎上リスク診断、IT発注相談、要件定義書チェック、
                                        システム選定支援、ベンダー選定支援、スポットでのIT発注相談、
                                        その他、IT発注に関するご依頼
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 bg-gray-50 font-semibold text-gray-900 w-1/3">対応可能な<br />システム・技術</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        Webアプリケーション、モバイルアプリ（iOS/Android）、
                                        業務システム、ECサイト、CRM、ERP、クラウドサービス導入など
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* プロフィール・信頼性セクション */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        プロフィール
                    </h2>
                    <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-6 py-4 bg-gray-100 font-semibold text-gray-900 w-1/3">氏名</td>
                                    <td className="px-6 py-4 text-gray-700">[名前] [名前]</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 bg-gray-100 font-semibold text-gray-900 w-1/3">営業時間</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        平日9:00～18:00、土日祝お休み<br />
                                        ※ 事前に日時が決まっていれば、平日夜や土日も対応します。
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 bg-gray-100 font-semibold text-gray-900 w-1/3">住所</td>
                                    <td className="px-6 py-4 text-gray-700">[都道府県] [市区町村]（最寄り駅：[駅名]）</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 bg-gray-100 font-semibold text-gray-900 w-1/3">職歴</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        IT受託開発会社でエンジニア・プロジェクトマネージャーとして〇年以上勤務。
                                        その後、IT受託開発会社の代表として独立。
                                        Flutterなどのモバイルアプリ・Webシステムの受託開発経験多数。
                                        中小企業のIT導入支援や、炎上案件のリカバリーなどの経験多数。
                                        現在に至る。
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-6 py-4 bg-gray-100 font-semibold text-gray-900 w-1/3">実績</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        関わらせていただいた事業者様は、3ケタ以上になります。<br />
                                        事業者様は個人事業主、ひとり社長の会社様から、従業員100名以上の会社様まで、業種も様々です。<br />
                                        ベンダー側・発注者側の両方を知っている立場からアドバイスします。
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 bg-gray-100 font-semibold text-gray-900 w-1/3">メッセージ</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        これまでに数多くのITプロジェクトに関わってきた経験から、
                                        発注者側の視点とベンダー側の視点の両方を理解しています。
                                        そのため、単なる技術的なチェックではなく、
                                        「経営者として本当に必要なのか？」「この投資は妥当なのか？」
                                        という視点でアドバイスいたします。
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* お客様の声セクション */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        お客様の声
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="mb-4">
                                <div className="flex text-yellow-400 mb-2">
                                    {'★★★★★'.split('').map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                「見積もりの妥当性が分かり、安心して発注できました。
                                第三者の視点でチェックしてもらえたことで、
                                不要な機能を削減でき、コストを30%削減できました。」
                            </p>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="font-semibold text-gray-900">株式会社ABC</p>
                                <p className="text-sm text-gray-600">代表取締役 〇〇 様</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="mb-4">
                                <div className="flex text-yellow-400 mb-2">
                                    {'★★★★★'.split('').map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                「過去にIT投資で失敗した経験があり、不安でしたが、
                                プロのエンジニアにチェックしてもらえたことで、
                                リスクを事前に把握できました。結果として、納期遅延もなく、
                                期待通りのシステムが完成しました。」
                            </p>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="font-semibold text-gray-900">株式会社DEF</p>
                                <p className="text-sm text-gray-600">経営企画部長 〇〇 様</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-8 md:col-span-2">
                            <div className="mb-4">
                                <div className="flex text-yellow-400 mb-2">
                                    {'★★★★★'.split('').map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                「フリーランスに依頼する前に、見積もりをチェックしてもらいました。
                                結果として、仕様の不明確な点やリスクを指摘してもらえ、
                                事前に仕様を明確化できました。見積もりチェックの費用で、数十万円の損失を
                                防げたと思います。」
                            </p>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="font-semibold text-gray-900">株式会社GHI</p>
                                <p className="text-sm text-gray-600">取締役 〇〇 様</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQセクション */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        よくある質問
                    </h2>
                    <div className="space-y-4">
                        <details className="bg-gray-50 rounded-lg p-6 cursor-pointer">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                どんな資料を用意すればいいですか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                見積書、提案書、要件定義書など、既にお持ちの資料をご用意ください。
                                まだ正式な見積もりが出ていない段階でも、要件や希望をまとめた資料があれば
                                チェック可能です。資料がない場合でも、まずはご相談ください。
                            </p>
                        </details>
                        <details className="bg-gray-50 rounded-lg p-6 cursor-pointer">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                まだ見積もりが出ていなくても相談できますか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                はい、可能です。見積もりが出る前の段階でも、要件定義書や
                                希望する機能のリストがあれば、事前にリスクや注意点を
                                お伝えすることができます。まずはお気軽にご相談ください。
                            </p>
                        </details>
                        <details className="bg-gray-50 rounded-lg p-6 cursor-pointer">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                オンラインのみでの対応は可能ですか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                はい、可能です。すでに多くの方とオンラインのみでご依頼いただいておりますので、ご安心ください。
                                ただ、どうしても難しいということであれば、都内近郊であればお伺いしますので、お気軽にご相談ください。
                            </p>
                        </details>
                        <details className="bg-gray-50 rounded-lg p-6 cursor-pointer">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                営業時間はどうなっていますか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                平日9:00～18:00の間、主に営業しております。土日祝日はお休みをいただいております。
                                お打ち合わせ等は平日9:00～18:00に承りたく思います。どうしても難しい場合はお気軽にご相談ください。
                            </p>
                        </details>
                        <details className="bg-gray-50 rounded-lg p-6 cursor-pointer">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                成果が出なかった場合の返金はありますか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                申し訳ございませんが、サービスの性質上、返金は対応しておりません。
                                ただし、フィードバック内容にご不明点がございましたら、
                                追加でご質問いただくことも可能です。お気軽にお問い合わせください。
                            </p>
                        </details>
                        <details className="bg-gray-50 rounded-lg p-6 cursor-pointer">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                チェック結果はどのような形式で提供されますか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                Zoomでのオンラインフィードバック（30〜45分）と、
                                要点をまとめた簡易レポート（PDF形式）を提供いたします。
                                レポートには、価格の妥当性、リスクポイント、改善提案などを
                                分かりやすくまとめています。
                            </p>
                        </details>
                        <details className="bg-gray-50 rounded-lg p-6 cursor-pointer">
                            <summary className="font-semibold text-gray-900 text-lg mb-2">
                                どのくらいの期間で結果がもらえますか？
                            </summary>
                            <p className="text-gray-700 mt-4 leading-relaxed">
                                お問い合わせいただいてから、通常1週間以内に
                                オンラインフィードバックの日程を調整させていただきます。
                                フィードバック後、1週間以内に簡易レポートをお送りいたします。
                                急ぎの場合は、お問い合わせ時にご相談ください。
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* 最終CTA・問い合わせフォームセクション */}
            <section id="contact" className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        お問い合わせ
                    </h2>
                    <p className="text-center text-gray-600 mb-4">
                        お仕事のご依頼、お見積り、その他ご質問等は下記よりご連絡ください。
                    </p>
                    <p className="text-center text-blue-600 font-semibold mb-12">
                        お問い合わせ（初回相談無料）
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-6"
                    >
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                会社名 <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="company"
                                name="company"
                                type="text"
                                required
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="株式会社〇〇"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                氏名 <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="山田 太郎"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                メールアドレス <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="example@company.com"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                カテゴリ <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">選択してください</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                相談内容 <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                id="message"
                                name="message"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="見積もりチェックのご相談、IT発注に関するご質問など、お気軽にご記入ください"
                                rows={6}
                                className="w-full"
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg disabled:opacity-50"
                        >
                            {isSubmitting ? '送信中...' : '相談内容を送信する'}
                        </Button>
                        {submitMessage && (
                            <p className={`text-sm text-center ${submitMessage.includes('受け付けました') ? 'text-green-600' : 'text-red-600'}`}>
                                {submitMessage}
                            </p>
                        )}
                        <p className="text-xs text-gray-500 text-center">
                            送信いただいた内容は、プライバシーポリシーに基づいて適切に管理いたします。
                        </p>
                    </form>
                </div>
            </section>

            {/* フッター */}
            <footer className="bg-gray-900 text-gray-400 py-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm">
                        © 2024 IT発注見積もりチェック＆炎上リスク診断. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App

